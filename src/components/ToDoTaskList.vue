<script setup lang="ts">
import { watch } from 'vue'

import { useTasksStore } from '@/stores/tasks'
import { storeToRefs } from 'pinia'
import ToDoTaskListItem from './ToDoTaskListItem.vue'

const taskStore = useTasksStore()
const { taskFilter, tasksFiltered } = storeToRefs(taskStore)
const { changeFilter } = taskStore

watch(taskFilter.value, () => {
  changeFilter({
    title: taskFilter.value.title,
    status: taskFilter.value.status,
  })
})
</script>

<template>
  <ul class="taskList">
    <li v-for="task in tasksFiltered" :key="task.id">
      <ToDoTaskListItem :task="task" />
    </li>
  </ul>
</template>
