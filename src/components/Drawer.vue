<template>
  <canvas :id="canvas.nodeId" :width="canvas.width" :height="canvas.height"></canvas>
  <button @click="begin">begin animation frame....</button>
  <button @click="end">end animation frame....</button>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { Canvas } from '../canvas/main'

const props = defineProps(['tool']);

// update toolset state
watch(() => props.tool, (tool) => {
  console.log('action - watch:', tool)
  canvasInstance.setToolState(tool)
})

// TODO find a better way to handle canvas configuration
let canvasInstance = new Canvas();
const canvas = {
  nodeId: "canvas-board",
  width: 500,
  height: 500
};

function begin() {
  console.log('action: ', props.tool);
  canvasInstance.begin();
}

function end() {
  canvasInstance.end();
}

onMounted((): void => {
  console.log('[init] canvas');
  canvasInstance.setConfig(canvas);
  canvasInstance.init();
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