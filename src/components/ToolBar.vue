<template>
  <div class="toolbar">
    <div class="actions">
      <button v-for="action of toolbar.actions" :id="action.id" :key="action.id"
        @click="handleActionChange(action.trigger)">{{ action.name }}</button>
      <div>
        <p>{{ tool }}</p>
      </div>
    </div>
    <div class="colors">
      <button v-for="color of toolbar.colors" :id="color.id" :key="color.id">{{ color.name }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// TODO update logic to receive props instead
import { ref } from '@vue/reactivity';
import { Tool } from '../canvas/models';
import { toolbar } from '../tools/util'
const emit = defineEmits<{ (e: 'handleActionUpdate', trigger: string): void }>();
const tool = ref(Tool.RECT);

function handleActionChange(trigger: string): void {
  tool.value = trigger as Tool;
  emit('handleActionUpdate', trigger);
}
</script>