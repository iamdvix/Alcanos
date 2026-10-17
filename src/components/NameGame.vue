<script setup>
import { ref, computed } from 'vue'
import StructureView from './StructureView.vue'
import PixelBar from './PixelBar.vue'
import { LEVELS, iupacName, distractors, explain, normalize, pickChallenge, shuffle } from '../data/alcanos.js'
import { score } from '../data/score.js'

const OPT = ['btn-mana', 'btn-aqua', 'btn-gold', 'btn-blossom']
const LEVEL_BTN = { facil: 'btn-slime', medio: 'btn-aqua', dificil: 'btn-blossom' }
const level = ref('facil')
const mode = ref('opciones')
const spec = ref(null)
const options = ref([])
const answer = ref('')
const result = ref(null)
const streak = ref(0)

const right = computed(() => (spec.value ? iupacName(spec.value) : ''))

function next() {
  spec.value = pickChallenge(level.value, spec.value)
  options.value = shuffle([iupacName(spec.value), ...distractors(spec.value)])
  answer.value = ''
  result.value = null
}

function submit(text) {
  if (result.value || !text.trim()) return
  const ok = normalize(text) === normalize(right.value)
  result.value = { ok, text }
  if (ok) {
    score.points += 10
    score.solved++
    streak.value++
  } else {
    streak.value = 0
  }
}

function setLevel(l) {
  level.value = l
  next()
}
function setMode(m) {
  mode.value = m
  next()
}

function optionClass(o) {
  if (!result.value) return ''
  if (o === right.value) return '!bg-slime !text-white'
  if (o === result.value.text) return '!bg-blossom !text-white'
  return 'opacity-50'
}

next()
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold sm:text-4xl">Pociones de nombres</h1>
    <div class="mt-3"><PixelBar /></div>
    <p class="mt-3 text-ink/80">Observa la estructura y encuentra su nombre IUPAC correcto.</p>

    <div class="mt-5 flex flex-wrap gap-3">
      <button v-for="(l, key) in LEVELS" :key="key" class="btn" :class="level === key && LEVEL_BTN[key]" @click="setLevel(key)">
        {{ l.label }}
      </button>
    </div>

    <div class="card card-slime mt-6">
      <div class="strip bg-slime"><span>Reto</span><span>Racha {{ streak }}</span></div>
      <div class="p-6 sm:p-8">
        <div class="flex gap-2">
          <button class="btn !py-1" :class="mode === 'opciones' && 'btn-mana'" @click="setMode('opciones')">Opciones</button>
          <button class="btn !py-1" :class="mode === 'escribir' && 'btn-mana'" @click="setMode('escribir')">Escribir</button>
        </div>

        <div class="slot mt-4 py-2"><StructureView :spec="spec" /></div>

        <div v-if="mode === 'opciones'" class="mt-4 grid gap-3 sm:grid-cols-2">
          <button v-for="(o, i) in options" :key="o" class="btn !py-3 text-base" :class="[OPT[i], optionClass(o)]" :disabled="!!result" @click="submit(o)">
            {{ o }}
          </button>
        </div>

        <form v-else class="mt-4 flex flex-col gap-3 sm:flex-row" @submit.prevent="submit(answer)">
          <input
            v-model="answer" :disabled="!!result" type="text" placeholder="Ejemplo: 2,3-dimetilbutano"
            class="flex-1 border-4 border-ink bg-white px-3 py-2 text-base outline-none focus:border-mana"
          />
          <button class="btn btn-mana" :disabled="!!result">Comprobar</button>
        </form>

        <div v-if="result" class="mt-5 border-4 border-ink p-4" :class="result.ok ? 'bg-slime/15' : 'bg-blossom/15'">
          <p class="text-lg font-bold">{{ result.ok ? 'Correcto. La poción está lista.' : 'Respuesta incorrecta.' }}</p>
          <p class="mt-1">Nombre correcto: <strong>{{ right }}</strong></p>
          <p class="mt-1 text-ink/80">{{ explain(spec) }}</p>
          <button class="btn btn-ink mt-4" @click="next">Siguiente</button>
        </div>
      </div>
    </div>
  </section>
</template>
