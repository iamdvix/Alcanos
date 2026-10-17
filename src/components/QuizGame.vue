<script setup>
import { ref, computed } from 'vue'
import PixelBar from './PixelBar.vue'
import { QUESTIONS } from '../data/quiz.js'
import { shuffle } from '../data/alcanos.js'
import { score } from '../data/score.js'

const ROUND = 10
const OPT = ['btn-mana', 'btn-aqua', 'btn-gold', 'btn-blossom']

const round = ref([])
const idx = ref(0)
const picked = ref(null)
const hits = ref(0)
const finished = ref(false)

const current = computed(() => round.value[idx.value])

function start() {
  round.value = shuffle(QUESTIONS)
    .slice(0, ROUND)
    .map((q) => ({ ...q, options: shuffle(q.o), right: q.o[0] }))
  idx.value = 0
  picked.value = null
  hits.value = 0
  finished.value = false
}

function pick(o) {
  if (picked.value) return
  picked.value = o
  if (o === current.value.right) {
    hits.value++
    score.points += 10
    score.solved++
  }
}

function next() {
  if (idx.value + 1 >= round.value.length) finished.value = true
  else {
    idx.value++
    picked.value = null
  }
}

function optionClass(o) {
  if (!picked.value) return ''
  if (o === current.value.right) return '!bg-slime !text-white'
  if (o === picked.value) return '!bg-blossom !text-white'
  return 'opacity-50'
}

start()
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold sm:text-4xl">Quiz de teoría</h1>
    <div class="mt-3"><PixelBar /></div>
    <p class="mt-3 text-ink/80">Rondas de {{ ROUND }} preguntas tomadas de un banco de {{ QUESTIONS.length }}.</p>

    <div class="card card-gold mt-6 shadow-[6px_6px_0_0_#d97706]">
      <div class="strip bg-gold flex-wrap gap-2">
        <span>Pregunta {{ finished ? ROUND : idx + 1 }} de {{ ROUND }}</span>
        <span>Aciertos {{ hits }}</span>
      </div>

      <div v-if="!finished" class="p-4 sm:p-8">
        <p class="text-xl font-bold sm:text-2xl">{{ current.q }}</p>
        <div class="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            v-for="(o, i) in current.options" :key="o"
            class="btn !justify-start !py-3 text-left text-base" :class="[OPT[i], optionClass(o)]"
            :disabled="!!picked" @click="pick(o)"
          >{{ o }}</button>
        </div>
        <div v-if="picked" class="mt-5 border-4 border-ink p-4" :class="picked === current.right ? 'bg-slime/15' : 'bg-blossom/15'">
          <p class="text-lg font-bold">{{ picked === current.right ? 'Correcto' : 'Respuesta incorrecta' }}</p>
          <p v-if="picked !== current.right" class="mt-1">Respuesta correcta: <strong>{{ current.right }}</strong></p>
          <p class="mt-1 text-ink/80">{{ current.w }}</p>
          <button class="btn btn-ink mt-4" @click="next">{{ idx + 1 >= ROUND ? 'Ver resultado' : 'Siguiente' }}</button>
        </div>
      </div>

      <div v-else class="p-4 text-center sm:p-8">
        <p class="text-5xl font-bold sm:text-6xl">{{ hits }} / {{ ROUND }}</p>
        <p class="mt-3 text-lg text-ink/80">
          {{ hits >= 9 ? 'Dominas los alcanos.' : hits >= 6 ? 'Muy bien, sigue practicando.' : 'Repasa el Grimorio y vuelve a intentarlo.' }}
        </p>
        <button class="btn btn-gold mt-5" @click="start">Nueva ronda</button>
      </div>
    </div>
  </section>
</template>
