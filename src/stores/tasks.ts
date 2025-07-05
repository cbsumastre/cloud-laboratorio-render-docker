import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import TaskStatus, { type Filter, type Task } from '@/types'
import { useStorageUserDevice } from '@/composables/useStorageUserDevice'

const taskFactory = (title: string): Task => {
  return {
    id: uuidv4(),
    title,
    ts: new Date(),
    status: TaskStatus.PENDING,
  }
}

export const useTasksStore = defineStore('tasksStore', () => {
  const allTasks = ref<Task[]>([])

  const {
    initFromUserStorage,
    getTasksFromUserStorage,
    addTaskToUserStorage,
    updateTaskInUserStorage,
    deleteTaskFromUserStorage,
  } = useStorageUserDevice()

  onMounted(async () => {
    await initFromUserStorage()
    const data = await getTasksFromUserStorage()
    allTasks.value = data
  })

  const taskFilter = ref<Filter>({
    status: undefined,
    title: '',
  })

  const tasksFiltered = computed(() => {
    return allTasks.value.filter((t) => {
      if (taskFilter.value.status && t.status !== taskFilter.value.status) {
        return false
      }
      if (
        taskFilter.value.title &&
        !t.title.toLowerCase().includes(taskFilter.value.title.toLowerCase())
      ) {
        return false
      }
      return true
    })
  })

  const addTask = (title: string) => {
    try {
      console.log(`begin addTask title ${title}`)
      const newTask = taskFactory(title)
      allTasks.value.push(newTask)
      console.info(`${JSON.stringify(newTask)} added`)
      addTaskToUserStorage(newTask)
    } catch (error) {
      console.error(error)
    } finally {
      console.log(`end addTask title ${title}`)
    }
  }

  const updateTask = (task: Task) => {
    try {
      console.log('begin updateTask', task)
      const idx = allTasks.value.findIndex((t) => t.id === task.id)
      console.log('idx', idx)
      if (idx >= 0) {
        console.info('task founded')
        allTasks.value[idx] = task
        updateTaskInUserStorage(task)
      } else {
        console.error(`${task} not found in tasks`)
      }
    } finally {
      console.log('end updateTask', task)
    }
  }

  const removeTask = (id: string) => {
    try {
      console.log('begin removeTask', id)
      const idx = allTasks.value.findIndex((t) => t.id === id)
      if (idx >= 0) {
        allTasks.value.splice(idx, 1)
        deleteTaskFromUserStorage(id)
      } else {
        console.error(`${id} not found in tasks`)
      }
    } finally {
      console.log('end removeTask', id)
    }
  }

  const changeFilter = (newFilter: Filter) => {
    console.log(`change filter ${JSON.stringify(newFilter)}`)
    taskFilter.value = newFilter
  }

  return { allTasks, tasksFiltered, taskFilter, addTask, updateTask, removeTask, changeFilter }
})
