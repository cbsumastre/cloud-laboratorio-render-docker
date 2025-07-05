<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const inputTaskRef: Ref<HTMLInputElement | null> = ref(null)

const title = ref()

const { addTask } = useTasksStore()

const handleAdd = () => {
  if (title.value.trim().length > 0) {
    addTask(title.value)
  }
  title.value = ''
  inputTaskRef.value?.focus()
}
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      placeholder="Add new task..."
      v-model="title"
      ref="inputTaskRef"
      aria-label="Add new task input input text"
      @keypress.enter="handleAdd"
    />
    <button @click="handleAdd" aria-label="Add new task button" title="Add new task">
      <i class="fas fa-plus"></i> Add
    </button>
  </div>
</template>
