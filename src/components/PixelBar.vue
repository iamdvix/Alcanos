<script setup>
defineProps({
  colors: { type: Array, default: () => ['#7c3aed', '#0891b2', '#16a34a', '#d97706', '#db2777'] },
})
</script>

<template>
  <div class="flex" aria-hidden="true">
    <span v-for="(c, i) in colors" :key="i" class="h-3 w-6 border-y-2 border-r-2 border-ink first:border-l-2" :style="{ background: c }"></span>
  </div>
</template>
