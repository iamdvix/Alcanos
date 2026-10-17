<script setup>
import { computed } from 'vue'
import { SPRITES } from '../data/sprites.js'

const props = defineProps({
  name: { type: String, default: 'bottle' },
  color: { type: String, default: '#7c3aed' },
  size: { type: Number, default: 48 },
})

const rows = computed(() => SPRITES[props.name] ?? SPRITES.bottle)
const cells = computed(() => {
  const out = []
  rows.value.forEach((r, y) => [...r].forEach((ch, x) => ch !== '.' && out.push({ x, y, ch })))
  return out
})
const FILL = { k: '#1f1b2e', w: '#ffffff', c: '#8b5a2b', h: '#ffffff' }
const fill = (ch) => (ch === 'L' || ch === 'D' ? props.color : FILL[ch])
</script>

<template>
  <svg
    :width="size" :height="(size * rows.length) / rows[0].length"
    :viewBox="`0 0 ${rows[0].length} ${rows.length}`" shape-rendering="crispEdges" aria-hidden="true"
  >
    <template v-for="(c, i) in cells" :key="i">
      <rect :x="c.x" :y="c.y" width="1" height="1" :fill="fill(c.ch)" :fill-opacity="c.ch === 'h' ? 0.8 : 1" />
      <rect v-if="c.ch === 'D'" :x="c.x" :y="c.y" width="1" height="1" fill="#1f1b2e" fill-opacity="0.28" />
    </template>
  </svg>
</template>
