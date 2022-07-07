
<template>
  <ToolBar @handleActionUpdate="handleActionUpdate" />
  <Drawer :tool="tool" />
</template>

<script setup lang="ts">
import ToolBar from './components/ToolBar.vue'
import Drawer from './components/Drawer.vue'
import { ref } from '@vue/reactivity';

const tool = ref("");

function handleActionUpdate(trigger: string) {
  console.log('app: ', trigger);
  tool.value = trigger;
}
</script>
