<script setup>
import { ref } from 'vue'
import PixelArt from './components/PixelArt.vue'
import PixelBar from './components/PixelBar.vue'
import Decor from './components/Decor.vue'
import HomeView from './components/HomeView.vue'
import InfoSection from './components/InfoSection.vue'
import NameGame from './components/NameGame.vue'
import BuildGame from './components/BuildGame.vue'
import { score } from './data/score.js'

const views = [
  { id: 'inicio', label: 'Inicio', comp: HomeView, on: 'btn-ink' },
  { id: 'aprender', label: 'Aprender', comp: InfoSection, on: 'btn-mana' },
  { id: 'nombrar', label: 'Nombrar', comp: NameGame, on: 'btn-slime' },
  { id: 'construir', label: 'Construir', comp: BuildGame, on: 'btn-aqua' },
]
const view = ref('inicio')
const current = () => views.find((v) => v.id === view.value).comp
function go(id) {
  view.value = id
  window.scrollTo({ top: 0 })
}
</script>

<template>
  <div class="relative min-h-screen">
    <Decor />

    <div class="relative z-10">
      <header class="sticky top-0 z-20 border-b-4 border-ink bg-white/85 backdrop-blur-md">
        <div class="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-3">
          <button class="flex items-center gap-3 text-left" @click="go('inicio')">
            <span class="flex items-end gap-1">
              <PixelArt name="bottle" color="#7c3aed" :size="22" />
              <PixelArt name="round" color="#16a34a" :size="22" />
              <PixelArt name="flask" color="#db2777" :size="22" />
            </span>
            <span class="text-lg font-bold">Alcanos</span>
          </button>
          <nav class="flex flex-wrap gap-2">
            <button v-for="v in views" :key="v.id" class="btn !px-3 !py-1" :class="view === v.id && v.on" @click="go(v.id)">
              {{ v.label }}
            </button>
          </nav>
          <span class="tag ml-auto !bg-gold !text-white">Puntos: {{ score.points }}</span>
        </div>
      </header>

      <main class="mx-auto max-w-5xl px-4 py-10">
        <component :is="current()" @go="go" />
      </main>

      <footer class="mx-auto max-w-5xl px-4 pb-10">
        <div class="flex items-center gap-3">
          <PixelBar />
          <span class="text-sm font-bold text-ink/60">Laboratorio de Alcanos &middot; C<sub>n</sub>H<sub>2n+2</sub></span>
        </div>
      </footer>
    </div>
  </div>
</template>
