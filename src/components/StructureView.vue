<script setup>
import { computed } from 'vue'

const props = defineProps({
  spec: { type: Object, required: true },
  selected: { type: Number, default: -1 },
  interactive: { type: Boolean, default: false },
  showNumbers: { type: Boolean, default: false },
})
const emit = defineEmits(['select'])

const STEP = 60
const width = computed(() => Math.max(320, props.spec.n * STEP + 40))

// Cadena principal en zigzag; las ramificaciones salen hacia afuera del zigzag.
const geometry = computed(() => {
  const atoms = []
  const bonds = []
  for (let i = 0; i < props.spec.n; i++) {
    atoms.push({ x: 40 + i * STEP, y: i % 2 === 0 ? 120 : 160, main: true, idx: i })
    if (i > 0) bonds.push([atoms[i - 1], atoms[i]])
  }
  const used = {}
  props.spec.subs.forEach((sub) => {
    const base = atoms[sub.p - 1]
    if (!base) return
    const k = (used[sub.p] = (used[sub.p] ?? -1) + 1)
    const total = props.spec.subs.filter((x) => x.p === sub.p).length
    const dir = base.y < 140 ? -1 : 1
    const dx = total === 1 ? 0 : k === 0 ? -22 : 22
    const b1 = { x: base.x + dx, y: base.y + dir * 48, main: false }
    atoms.push(b1)
    bonds.push([base, b1])
    if (sub.t === 'e') {
      const b2 = { x: b1.x + (dx < 0 ? -28 : 28), y: b1.y + dir * 34, main: false }
      atoms.push(b2)
      bonds.push([b1, b2])
    }
  })
  return { atoms, bonds }
})
</script>

<template>
  <div class="overflow-x-auto">
    <svg :viewBox="`0 0 ${width} 270`" :width="width" height="270" class="mx-auto block" role="img" aria-label="Estructura del alcano">
      <g stroke="#1f1b2e" stroke-width="5" stroke-linecap="square">
        <line v-for="(b, i) in geometry.bonds" :key="'b' + i" :x1="b[0].x" :y1="b[0].y" :x2="b[1].x" :y2="b[1].y" />
      </g>
      <g v-for="(a, i) in geometry.atoms" :key="'a' + i">
        <rect
          v-if="interactive && a.main && selected === a.idx"
          :x="a.x - 19" :y="a.y - 19" width="38" height="38" fill="#7c3aed" fill-opacity="0.18" stroke="#7c3aed" stroke-width="4"
        />
        <rect :x="a.x - 13" :y="a.y - 13" width="26" height="26" :fill="a.main ? '#0891b2' : '#db2777'" stroke="#1f1b2e" stroke-width="4" />
        <rect :x="a.x - 9" :y="a.y - 9" width="5" height="5" fill="#ffffff" fill-opacity="0.7" />
        <text :x="a.x + 1" :y="a.y + 6" text-anchor="middle" font-size="14" font-weight="700" fill="#ffffff">C</text>
        <text
          v-if="showNumbers && a.main"
          :x="a.x" :y="a.y + (a.y < 140 ? -24 : 42)"
          text-anchor="middle" font-size="14" font-weight="700" fill="#1f1b2e"
        >{{ a.idx + 1 }}</text>
        <rect
          v-if="interactive && a.main"
          :x="a.x - 26" :y="a.y - 26" width="52" height="52" fill="transparent"
          class="cursor-pointer" @click="emit('select', a.idx)"
        />
      </g>
    </svg>
  </div>
</template>
