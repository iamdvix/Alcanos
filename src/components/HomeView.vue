<script setup>
import PixelArt from './PixelArt.vue'
import AlchemyScene from './AlchemyScene.vue'
import { LEVELS } from '../data/alcanos.js'
import { QUESTIONS } from '../data/quiz.js'
defineEmits(['go'])

const stations = [
  { id: 'aprender', n: '01', eyebrow: 'LIBRO ENCANTADO', title: 'El códice', text: 'Abre el conocimiento prohibido: propiedades, nomenclatura, prefijos y tablas.', color: '#b68ae0', sprite: 'book', kind: 'mana', action: 'Abrir códice' },
  { id: 'nombrar', n: '02', eyebrow: 'MESA DE CARTOGRAFÍA', title: 'Descifra el nombre', text: 'Observa las cadenas de carbono y descubre cómo se llama cada compuesto.', color: '#90c88d', sprite: 'scroll', kind: 'slime', action: 'Descifrar' },
  { id: 'construir', n: '03', eyebrow: 'SOPORTE DE POCIONES', title: 'Crea la fórmula', text: 'Construye un alcano átomo por átomo y comprueba si dominaste la receta.', color: '#78c9c7', sprite: 'bottle', kind: 'aqua', action: 'Construir' },
  { id: 'quiz', n: '04', eyebrow: 'PRUEBA DE EXPERIENCIA', title: 'Desafío final', text: 'Supera diez preguntas, reúne XP y demuestra tus habilidades de alquimista.', color: '#eac178', sprite: 'emerald', kind: 'gold', action: 'Aceptar reto' },
]
const challengeCount = Object.values(LEVELS).reduce((a, l) => a + l.items.length, 0) + QUESTIONS.length
</script>

<template>
  <section class="home-screen">
    <div class="hero-world">
      <div class="hero-upper"><span class="live-rune">✦</span> MUNDO: LA FÓRMULA DEL ALQUIMISTA <span class="hero-version">FERIA DE CIENCIA · 2026</span></div>
      <div class="hero-body">
        <div class="hero-copy">
          <div class="mission-tag"><PixelArt name="book" color="#b78be5" :size="25" /> MISIÓN PRINCIPAL <span> / CAPÍTULO I</span></div>
          <h1 class="hero-title"><span>LA FÓRMULA</span><span>DEL <em>ALQUIMISTA</em></span></h1>
          <p class="hero-quote">«Hay una fórmula que nadie ve... y que todos usan».</p>
          <p class="hero-intro">En las profundidades de un laboratorio olvidado, un aldeano guarda el secreto de los <strong>enlaces del carbono</strong>. Sigue las pistas, consulta el códice y construye tu propia fórmula.</p>
          <div class="hero-actions">
            <button class="mc-action action-green" @click="$emit('go', 'construir')"><PixelArt name="bottle" color="#84d7a9" :size="23" /> ENTRAR AL LABORATORIO <span aria-hidden="true">›</span></button>
            <button class="mc-action action-secondary" @click="$emit('go', 'aprender')"><PixelArt name="book" color="#d8b1f1" :size="22" /> LEER EL CÓDICE</button>
          </div>
          <div class="hero-note"><span class="note-diamond">◆</span> Solo necesitas dos elementos: carbono e hidrógeno.</div>
        </div>
        <div class="hero-art">
          <AlchemyScene />
          <div class="scene-caption"><span class="pixel-dot"></span> LABORATORIO SUBTERRÁNEO <span>·</span> ALDEANO CLÉRIGO</div>
        </div>
      </div>
      <div class="hero-status">
        <span><PixelArt name="emerald" color="#6ac783" :size="17" /> {{ challengeCount }} DESAFÍOS</span>
        <span><PixelArt name="diamond" color="#7bd1e1" :size="17" /> 4 NIVELES</span>
        <span><PixelArt name="sparkle" color="#f5bd67" :size="17" /> 3 JUEGOS</span>
        <span class="status-right">C<sub>n</sub>H<sub>2n+2</sub> <span>◈</span></span>
      </div>
    </div>

    <div class="mission-heading">
      <div><div class="heading-eyebrow">SELECCIONA TU DESTINO</div><h2>CUATRO ESTACIONES. <span>UN SECRETO.</span></h2></div>
      <span class="quest-counter">01 — 04 / EXPLORACIÓN</span>
    </div>
    <div class="station-grid">
      <article v-for="s in stations" :key="s.id" class="station" :class="'station-' + s.kind">
        <div class="station-top"><span>ESTACIÓN {{ s.n }}</span><span class="station-star">✦</span></div>
        <div class="station-content">
          <div class="station-icon"><div class="station-light"></div><PixelArt :name="s.sprite" :color="s.color" :size="75" /></div>
          <div class="station-eyebrow">{{ s.eyebrow }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
          <button class="station-link" @click="$emit('go', s.id)">{{ s.action }} <span aria-hidden="true">➜</span></button>
        </div>
      </article>
    </div>
    <div class="world-tip"><PixelArt name="torch" color="#f4bb62" :size="31" /><div><strong>CONSEJO DEL ALDEANO</strong><p>Empieza por el códice si es tu primera visita, o entra directamente al laboratorio para aprender mientras juegas.</p></div><span class="world-tip-end">✧ ✦ ✧</span></div>
  </section>
</template>
