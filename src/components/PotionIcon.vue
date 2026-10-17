<script setup>
defineProps({
  color: { type: String, default: '#7c3aed' },
  size: { type: Number, default: 40 },
})
</script>

<template>
  <svg :width="size" :height="size * 1.25" viewBox="0 0 16 20" shape-rendering="crispEdges" aria-hidden="true">
    <rect x="6" y="0" width="4" height="2" fill="#8b5a2b" />
    <rect x="5" y="2" width="6" height="6" fill="#1f1b2e" />
    <rect x="2" y="8" width="12" height="10" fill="#1f1b2e" />
    <rect x="3" y="7" width="10" height="1" fill="#1f1b2e" />
    <rect x="6" y="3" width="4" height="5" fill="#ffffff" />
    <rect x="4" y="9" width="8" height="7" :fill="color" />
    <rect x="4" y="9" width="8" height="1" fill="#ffffff" fill-opacity="0.5" />
    <rect x="5" y="11" width="1" height="3" fill="#ffffff" fill-opacity="0.6" />
    <rect x="9" y="13" width="1" height="1" fill="#ffffff" fill-opacity="0.6" />
  </svg>
</template>
