<template>
  <canvas :id="canvas.id" :width="canvas.width" :height="canvas.height"></canvas>
</template>

<script setup lang="ts">
  import { onMounted, onBeforeUnmount } from 'vue'

  // TODO find a better way to handle canvas configuration
  const canvas = {
    id: "canvas-board",
    width: 500,
    height: 500
  }

  onMounted((): void => {
    console.log('[init] canvas');
  })

  onBeforeUnmount((): void => {
    console.log('[destroy] canvas');
  })
</script>

<style scoped>
canvas {
  border: 1px solid gray;
}
</style>