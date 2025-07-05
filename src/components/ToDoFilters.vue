<script setup lang="ts">
import { storeToRefs } from 'pinia'

import TaskStatus from '@/types'
import { useTasksStore } from '@/stores/tasks'

const taskStore = useTasksStore()
const { taskFilter } = storeToRefs(taskStore)

const handleStatus = (status: TaskStatus | undefined) => {
  taskStore.changeFilter({
    title: taskFilter.value.title,
    status,
  })
}
</script>

<template>
  <div class="filters">
    <button
      id="allTasks"
      aria-label="Mostrar todas las tareas"
      :class="{ selected: taskFilter?.status === undefined }"
      @click="handleStatus(undefined)"
    >
      <i class="fas fa-clipboard-list"></i> All
    </button>
    <button
      id="pendingTasks"
      aria-label="Mostrar tareas pendientes"
      :class="{ selected: taskFilter?.status === TaskStatus.PENDING }"
      @click="handleStatus(TaskStatus.PENDING)"
    >
      <i class="fas fa-clock"></i> Pending
    </button>
    <button
      id="completedTasks"
      aria-label="Mostrar tareas completadas"
      :class="{ selected: taskFilter?.status === TaskStatus.COMPLETED }"
      @click="handleStatus(TaskStatus.COMPLETED)"
    >
      <i class="fas fa-check-square"></i> Completed
    </button>
  </div>
</template>
