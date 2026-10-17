<script setup>
import { ref, computed } from 'vue'
import StructureView from './StructureView.vue'
import PixelBar from './PixelBar.vue'
import { LEVELS, iupacName, formula, totalC, sameStructure, pickChallenge } from '../data/alcanos.js'
import { score } from '../data/score.js'

const LEVEL_BTN = { facil: 'btn-slime', medio: 'btn-aqua', dificil: 'btn-blossom' }
const level = ref('facil')
const target = ref(pickChallenge('facil', null))
const n = ref(1)
const subs = ref([])
const selected = ref(-1)
const result = ref(null)
const awarded = ref(false)

const build = computed(() => ({ n: n.value, subs: subs.value }))
const targetName = computed(() => iupacName(target.value))
const pos = computed(() => selected.value + 1)
const canBranch = computed(
  () => pos.value >= 2 && pos.value <= n.value - 1 && subs.value.filter((x) => x.p === pos.value).length < 2,
)

function setN(d) {
  n.value = Math.min(8, Math.max(1, n.value + d))
  subs.value = subs.value.filter((x) => x.p >= 2 && x.p <= n.value - 1)
  if (selected.value > n.value - 1) selected.value = -1
  result.value = null
}

function add(t) {
  if (!canBranch.value) return
  subs.value.push({ p: pos.value, t })
  result.value = null
}

function clearCarbon() {
  subs.value = subs.value.filter((x) => x.p !== pos.value)
  result.value = null
}

function reset() {
  n.value = 1
  subs.value = []
  selected.value = -1
  result.value = null
  awarded.value = false
}

function next() {
  target.value = pickChallenge(level.value, target.value)
  reset()
}

function setLevel(l) {
  level.value = l
  next()
}

function check() {
  if (sameStructure(build.value, target.value)) {
    result.value = { ok: true, msg: 'Estructura correcta. Has creado ' + targetName.value + '.' }
    if (!awarded.value) {
      score.points += 15
      score.solved++
      awarded.value = true
    }
  } else if (totalC(build.value) !== totalC(target.value)) {
    result.value = { ok: false, msg: `Tu molécula tiene ${totalC(build.value)} carbonos y se necesitan ${totalC(target.value)}.` }
  } else {
    result.value = { ok: false, msg: 'La cantidad de carbonos es correcta, pero la disposición no coincide. Revisa las posiciones de las ramificaciones.' }
  }
}
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold sm:text-4xl">Caldero de estructuras</h1>
    <div class="mt-3"><PixelBar /></div>
    <p class="mt-3 text-ink/80">Construye la molécula que corresponde al nombre indicado.</p>

    <div class="mt-5 flex flex-wrap gap-3">
      <button v-for="(l, key) in LEVELS" :key="key" class="btn" :class="level === key && LEVEL_BTN[key]" @click="setLevel(key)">
        {{ l.label }}
      </button>
    </div>

    <div class="card card-aqua mt-6">
      <div class="strip bg-aqua"><span>Objetivo</span><span>Fórmula esperada {{ formula(target) }}</span></div>
      <div class="p-6 sm:p-8">
        <p class="text-2xl font-bold">{{ targetName }}</p>

        <div class="slot mt-4 py-2">
          <StructureView :spec="build" :selected="selected" interactive show-numbers @select="selected = $event" />
        </div>
        <p class="mt-2 text-center text-sm text-ink/70">
          Toca un carbono de la cadena para seleccionarlo. Solo los carbonos internos admiten ramificaciones (máximo 2).
        </p>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <span class="font-bold">Cadena principal:</span>
          <button class="btn !px-3 !py-1" :disabled="n <= 1" @click="setN(-1)">-</button>
          <span class="w-6 text-center text-lg font-bold">{{ n }}</span>
          <button class="btn !px-3 !py-1" :disabled="n >= 8" @click="setN(1)">+</button>
          <span class="tag ml-auto !bg-mana !text-white">Tu fórmula: {{ formula(build) }}</span>
        </div>

        <div class="mt-4 flex flex-wrap gap-3">
          <button class="btn btn-blossom" :disabled="!canBranch" @click="add('m')">Agregar metil</button>
          <button class="btn btn-mana" :disabled="!canBranch" @click="add('e')">Agregar etil</button>
          <button class="btn btn-gold" :disabled="selected < 0" @click="clearCarbon">Quitar del carbono</button>
          <button class="btn" @click="reset">Limpiar</button>
        </div>

        <div class="mt-5 flex flex-wrap gap-3">
          <button class="btn btn-slime" @click="check">Verificar</button>
          <button class="btn btn-ink" @click="next">Otro reto</button>
        </div>

        <div v-if="result" class="mt-5 border-4 border-ink p-4" :class="result.ok ? 'bg-slime/15' : 'bg-blossom/15'">
          <p class="font-bold">{{ result.ok ? 'Correcto' : 'Aún no' }}</p>
          <p class="mt-1">{{ result.msg }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
