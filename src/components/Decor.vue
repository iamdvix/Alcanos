<script setup>
import PixelArt from './PixelArt.vue'
const particles = [
  { n: 'sparkle', color: '#9270ad', x: '7%', y: '20%', s: 22, d: '0s' },
  { n: 'diamond', color: '#638d9f', x: '93%', y: '29%', s: 27, d: '1.9s' },
  { n: 'sparkle', color: '#5c906e', x: '4%', y: '62%', s: 21, d: '1s' },
  { n: 'emerald', color: '#5c906e', x: '94%', y: '76%', s: 28, d: '2.2s' },
  { n: 'bubble', color: '#885eae', x: '13%', y: '87%', s: 20, d: '1.4s' },
  { n: 'sparkle', color: '#ad875a', x: '86%', y: '54%', s: 20, d: '3s' },
]
</script>
<template>
  <div class="world-atmosphere" aria-hidden="true">
    <div class="ambient ambient-left"></div><div class="ambient ambient-right"></div>
    <div class="floating-particles"><span v-for="(p, i) in particles" :key="i" class="float-sprite" :style="{ left: p.x, top: p.y, animationDelay: p.d }"><PixelArt :name="p.n" :color="p.color" :size="p.s" /></span></div>
  </div>
</template>
