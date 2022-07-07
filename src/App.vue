
<template>
  <ToolBar @handleActionUpdate="handleActionUpdate" />
  <Drawer :action="action" />
</template>

<script setup lang="ts">
import ToolBar from './components/ToolBar.vue'
import Drawer from './components/Drawer.vue'
import { ref } from '@vue/reactivity';

const action = ref("");

function handleActionUpdate(trigger: string) {
  console.log('app: ', trigger);
  action.value = trigger;
}
</script>
