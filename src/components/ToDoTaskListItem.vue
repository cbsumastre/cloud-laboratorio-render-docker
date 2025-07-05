<script setup lang="ts">
import { useTasksStore } from '@/stores/tasks'
import type { Task } from '@/types'
import TaskStatus from '@/types'
import { ref } from 'vue'

const props = defineProps<{
  task: Task
}>()

const description = ref(props.task.title)
const modoEdicion = ref(false)

const { updateTask, removeTask } = useTasksStore()

const handleUpdateStatus = () => {
  console.log('handleStatus')
  updateTask({
    ...props.task,
    status: props.task.status === TaskStatus.PENDING ? TaskStatus.COMPLETED : TaskStatus.PENDING,
  })
}

const handleUpdateDescription = () => {
  modoEdicion.value = false
  console.log('Descripcion tarea actualizada', description)
  updateTask({
    ...props.task,
    title: description.value,
  })
}

const handleBorrar = () => {
  console.log('handleBorrar')
  removeTask(props.task.id)
}
</script>

<template>
  <div class="taskItem">
    <input
      type="checkbox"
      :checked="task.status === TaskStatus.COMPLETED"
      @change="handleUpdateStatus"
      aria-label="mark the task as completed"
    />
    <input
      type="text"
      v-model="description"
      :readonly="modoEdicion === false"
      @focus="modoEdicion = true"
      @blur="handleUpdateDescription"
      @keypress.enter="handleUpdateDescription"
      :class="{ completed: task.status === TaskStatus.COMPLETED }"
    />
    <div class="taskItemButtons">
      <button aria-label="Borrar la tarea" @click="handleBorrar" class="danger">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>
