<script setup>
import PixelArt from './PixelArt.vue'
import PixelBar from './PixelBar.vue'
import { LEVELS } from '../data/alcanos.js'
import { QUESTIONS } from '../data/quiz.js'
defineEmits(['go'])

const modules = [
  { id: 'aprender', n: '01', title: 'Grimorio', text: 'Aprende qué son los alcanos, su fórmula general, las reglas de nomenclatura y sus usos.', color: '#7c3aed', sprite: 'flask', strip: 'bg-mana', btn: 'btn-mana', shadow: 'card-mana' },
  { id: 'nombrar', n: '02', title: 'Pociones de nombres', text: 'Observa una estructura y escribe o elige el nombre IUPAC correcto.', color: '#16a34a', sprite: 'round', strip: 'bg-slime', btn: 'btn-slime', shadow: 'card-slime' },
  { id: 'construir', n: '03', title: 'Caldero de estructuras', text: 'Recibe un nombre y construye la molécula carbono por carbono.', color: '#0891b2', sprite: 'bottle', strip: 'bg-aqua', btn: 'btn-aqua', shadow: 'card-aqua' },
  { id: 'quiz', n: '04', title: 'Quiz de teoría', text: 'Rondas de preguntas sobre fórmulas, propiedades, usos y nomenclatura.', color: '#d97706', sprite: 'gem', strip: 'bg-gold', btn: 'btn-gold', shadow: 'card-gold' },
]
const total = Object.values(LEVELS).reduce((a, l) => a + l.items.length, 0) + QUESTIONS.length
const stats = [
  { v: total, l: 'ejercicios', c: 'bg-mana' },
  { v: Object.keys(LEVELS).length, l: 'niveles', c: 'bg-slime' },
  { v: 3, l: 'juegos', c: 'bg-blossom' },
]
</script>

<template>
  <section>
    <div class="card card-mana">
      <div class="strip bg-ink"><span>Química orgánica</span><span>Nivel inicial</span></div>
      <div class="grid gap-8 p-5 sm:p-10 md:grid-cols-5">
        <div class="md:col-span-3">
          <h1 class="text-4xl leading-tight font-bold sm:text-6xl">Laboratorio de Alcanos</h1>
          <div class="mt-4"><PixelBar /></div>
          <p class="mt-5 text-lg text-ink/80">
            Mezcla carbonos e hidrógenos como un alquimista. Estudia los hidrocarburos saturados, nombra estructuras y
            construye moléculas en un laboratorio inspirado en las pociones.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <button class="btn btn-ink !px-7 !py-3 text-base" @click="$emit('go', 'aprender')">Comenzar</button>
            <button class="btn btn-slime !px-7 !py-3 text-base" @click="$emit('go', 'nombrar')">Jugar ya</button>
          </div>
          <div class="mt-7 flex flex-wrap gap-3">
            <span v-for="s in stats" :key="s.l" class="border-4 border-ink px-3 py-1 font-bold text-white shadow-[3px_3px_0_0_#1f1b2e]" :class="s.c">
              {{ s.v }} {{ s.l }}
            </span>
          </div>
        </div>

        <!-- Estante de pociones -->
        <div class="relative flex h-72 flex-col justify-end border-4 border-ink bg-aqua/15 md:col-span-2">
          <div class="bob absolute top-4 left-5"><PixelArt name="sparkle" color="#7c3aed" :size="25" /></div>
          <div class="bob absolute top-8 right-6" style="animation-delay: 1s"><PixelArt name="bubble" color="#db2777" :size="30" /></div>
          <div class="bob absolute top-20 left-1/2" style="animation-delay: 2s"><PixelArt name="gem" color="#d97706" :size="28" /></div>
          <div class="flex items-end justify-center gap-3 px-3">
            <PixelArt name="flask" color="#7c3aed" :size="80" />
            <PixelArt name="round" color="#16a34a" :size="104" />
            <PixelArt name="bottle" color="#db2777" :size="76" />
          </div>
          <div class="border-t-4 border-ink bg-[#a86a35]"><div class="h-2 bg-[#c98a4b]"></div><div class="h-3"></div></div>
        </div>
      </div>
    </div>

    <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <article v-for="m in modules" :key="m.id" class="card flex flex-col" :class="m.shadow">
        <div class="strip" :class="m.strip"><span>Módulo {{ m.n }}</span></div>
        <div class="flex flex-1 flex-col p-5">
          <div class="slot flex h-24 w-24 items-center justify-center">
            <PixelArt :name="m.sprite" :color="m.color" :size="56" />
          </div>
          <h2 class="mt-4 text-xl font-bold">{{ m.title }}</h2>
          <p class="mt-2 flex-1 text-ink/80">{{ m.text }}</p>
          <button class="btn mt-5" :class="m.btn" @click="$emit('go', m.id)">Entrar</button>
        </div>
      </article>
    </div>
  </section>
</template>
