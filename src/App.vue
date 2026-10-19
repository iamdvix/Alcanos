<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import PixelArt from './components/PixelArt.vue'
import Decor from './components/Decor.vue'
import HomeView from './components/HomeView.vue'
import InfoSection from './components/InfoSection.vue'
import NameGame from './components/NameGame.vue'
import BuildGame from './components/BuildGame.vue'
import QuizGame from './components/QuizGame.vue'
import { score } from './data/score.js'

const views = [
  { id: 'inicio', label: 'Inicio', icon: 'home', comp: HomeView },
  { id: 'aprender', label: 'Códice', icon: 'book', comp: InfoSection },
  { id: 'nombrar', label: 'Nombrar', icon: 'scroll', comp: NameGame },
  { id: 'construir', label: 'Construir', icon: 'bottle', comp: BuildGame },
  { id: 'quiz', label: 'Prueba', icon: 'emerald', comp: QuizGame },
]
const view = ref('inicio')
const current = computed(() => views.find((v) => v.id === view.value)?.comp ?? HomeView)
const xpProgress = computed(() => score.points % 100)
const level = computed(() => Math.floor(score.points / 100) + 1)

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem('alchemist-xp') || '{}')
    if (Number.isFinite(saved.points) && saved.points >= 0) score.points = saved.points
    if (Number.isFinite(saved.solved) && saved.solved >= 0) score.solved = saved.solved
  } catch { /* La aplicación sigue funcionando si el almacenamiento no está disponible. */ }
})
watch(() => [score.points, score.solved], () => {
  try { localStorage.setItem('alchemist-xp', JSON.stringify({ points: score.points, solved: score.solved })) } catch { /* Opcional. */ }
})
function go(id) {
  if (!views.some(v => v.id === id)) return
  view.value = id
  window.scrollTo({ top: 0, behavior: 'instant' })
}
</script>

<template>
  <div class="app-shell">
    <Decor />
    <div class="app-content">
      <header class="world-header">
        <div class="topline"><span>✦ CENTRO ESCOLAR INSA <span class="topline-extra">· FERIA DE CIENCIA Y TECNOLOGÍA 2026</span></span><span>✧ EL MUNDO DE LA ALQUIMIA ✧</span></div>
        <div class="header-main">
          <button class="brand-mark" aria-label="Volver al inicio" @click="go('inicio')">
            <span class="logo-cube"><PixelArt name="bottle" color="#a879d7" :size="40" /></span>
            <span class="brand-copy"><span class="brand-small">EL LABORATORIO DE</span><strong>LA FÓRMULA DEL ALQUIMISTA</strong></span>
          </button>
          <nav class="world-nav" aria-label="Navegación principal">
            <button v-for="v in views" :key="v.id" class="nav-slot" :class="{ 'nav-slot-active': view === v.id }" :aria-current="view === v.id ? 'page' : undefined" @click="go(v.id)">
              <PixelArt :name="v.icon" :color="view === v.id ? '#b9f1a0' : '#b9a6ce'" :size="25" />
              <span>{{ v.label }}</span>
            </button>
          </nav>
          <div class="xp-hud" :aria-label="`Experiencia: ${score.points} XP. Nivel ${level}`">
            <div class="xp-above"><PixelArt name="emerald" color="#74d770" :size="20" /><span>XP</span><b>{{ score.points }}</b></div>
            <div class="xp-progress" role="progressbar" :aria-valuenow="xpProgress" aria-valuemin="0" aria-valuemax="100" aria-label="Progreso de nivel"><span :style="{ width: `${xpProgress}%` }"></span></div>
            <div class="xp-level">NIVEL {{ level }}</div>
          </div>
        </div>
      </header>

      <main class="world-main">
        <Transition name="portal" mode="out-in">
          <component :is="current" :key="view" @go="go" />
        </Transition>
      </main>
      <footer class="world-footer"><span>✦ LA FÓRMULA DEL ALQUIMISTA</span><span>CARBONO + HIDRÓGENO = NUEVAS POSIBILIDADES</span><span>INSA · 2026</span></footer>
    </div>
  </div>
</template>
