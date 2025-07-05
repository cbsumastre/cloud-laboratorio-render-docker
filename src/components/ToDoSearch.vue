<script setup lang="ts">
import { useDebounce } from '@/composables/useDebounce'
import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const taskStore = useTasksStore()
const { taskFilter } = storeToRefs(taskStore)
const { changeFilter } = useTasksStore()

const searchText = ref('')
const searchTextDebounced = useDebounce(searchText, 500)

watch(searchTextDebounced, () => {
  changeFilter({
    status: taskFilter.value.status,
    title: searchText.value,
  })
})
</script>

<template>
  <div class="search">
    <input
      type="text"
      id="searchInput"
      placeholder="Filter tasks by description..."
      v-model="searchText"
      aria-label="Filter tasks by description"
    />
  </div>
</template>
