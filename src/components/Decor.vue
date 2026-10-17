<script setup>
import PixelArt from './PixelArt.vue'

// Fondo blanco con desenfoques de color y detalles en pixel art.
const items = [
  { s: 'sparkle', c: '#7c3aed', x: '4%', y: '16%', z: 30, d: '0s' },
  { s: 'bubble', c: '#0891b2', x: '95%', y: '12%', z: 36, d: '1s' },
  { s: 'gem', c: '#db2777', x: '3%', y: '46%', z: 40, d: '2s' },
  { s: 'sparkle', c: '#d97706', x: '94%', y: '40%', z: 30, d: '1.5s' },
  { s: 'bottle', c: '#16a34a', x: '2%', y: '74%', z: 44, d: '0.5s' },
  { s: 'bubble', c: '#7c3aed', x: '95%', y: '68%', z: 30, d: '2.5s' },
  { s: 'gem', c: '#0891b2', x: '93%', y: '88%', z: 34, d: '3s' },
  { s: 'sparkle', c: '#db2777', x: '8%', y: '92%', z: 26, d: '1.2s' },
]
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <div class="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-mana/40 blur-3xl"></div>
    <div class="absolute top-10 -right-40 h-[34rem] w-[34rem] rounded-full bg-aqua/40 blur-3xl"></div>
    <div class="absolute top-1/2 -left-40 h-[28rem] w-[28rem] rounded-full bg-blossom/30 blur-3xl"></div>
    <div class="absolute -right-32 -bottom-40 h-[32rem] w-[32rem] rounded-full bg-slime/35 blur-3xl"></div>
    <div class="absolute -bottom-48 left-1/3 h-[28rem] w-[28rem] rounded-full bg-gold/30 blur-3xl"></div>
    <div class="absolute top-1/3 left-1/2 h-80 w-80 rounded-full bg-aqua/20 blur-3xl"></div>
  </div>
  <div class="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden lg:block" aria-hidden="true">
    <div v-for="(i, k) in items" :key="k" class="bob absolute" :style="{ left: i.x, top: i.y, animationDelay: i.d }">
      <PixelArt :name="i.s" :color="i.c" :size="i.z" />
    </div>
  </div>
</template>
