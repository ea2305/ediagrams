<template>
  <div class="toolbar">
    <div class="actions">
      <button v-for="action of toolbar.actions" :id="action.id" :key="action.id">{{ action.name }}</button>
    </div>
    <div class="colors">
      <button v-for="color of toolbar.colors" :id="color.id" :key="color.id">{{ color.name }}</button>
    </div>
  </div>
</template>

<script setup>
import { toolbar } from '../tools/util'
</script>