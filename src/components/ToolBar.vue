<template>
  <div class="toolbar">
    <div class="actions">
      <button v-for="action of toolbar.actions" :id="action.id" :key="action.id"
        @click="handleActionChange(action.trigger)">{{ action.name }}</button>
    </div>
    <div class="colors">
      <button v-for="color of toolbar.colors" :id="color.id" :key="color.id">{{ color.name }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO update logic to receive props instead
import { toolbar } from '../tools/util'
const emit = defineEmits<{ (e: 'handleActionUpdate', trigger: string): void }>();

function handleActionChange(trigger: string): void {
  emit('handleActionUpdate', trigger);
}
</script>