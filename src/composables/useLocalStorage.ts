import type { Task, Storage } from '@/types'

const keyStorage = 'todo-app-vue-storage'

export const useLocalStorage = (): Storage => {
  const initStorage = async () => {
    return new Promise<void>((resolve) => {
      if (!localStorage.getItem(keyStorage)) {
        localStorage.setItem(keyStorage, JSON.stringify([]))
      }
      resolve()
    })
  }

  const saveTasksInLocalStorage = (tasks: Task[]): void => {
    localStorage.setItem(keyStorage, JSON.stringify(tasks))
  }

  const getTasksFromLocalStorage = async (): Promise<Task[]> => {
    return new Promise<Task[]>((resolve) => {
      const tasksStr = localStorage.getItem(keyStorage)
      let tasks: Task[] = []
      if (tasksStr) {
        tasks = JSON.parse(tasksStr)
      } else {
        saveTasksInLocalStorage(tasks)
      }

      resolve(tasks)
    })
  }

  const addTaskToLocalStorage = async (task: Task) => {
    const tasks = await getTasksFromLocalStorage()
    const idx = tasks.findIndex((t) => t.id === task.id)
    if (idx >= 0) {
      console.warn(`task ${task} found`)
    } else {
      tasks.push(task)
      saveTasksInLocalStorage(tasks)
    }
  }

  const updateTaskInLocalStorage = async (task: Task) => {
    const tasks = await getTasksFromLocalStorage()
    const idx = tasks.findIndex((t) => t.id === task.id)
    if (idx >= 0) {
      tasks[idx] = task
      saveTasksInLocalStorage(tasks)
    } else {
      console.log(`task ${task} not found`)
    }
  }

  const deleteTaskFromLocalStorage = async (id: string) => {
    const tasks = await getTasksFromLocalStorage()
    const idx = tasks.findIndex((t) => t.id === id)
    if (idx >= 0) {
      tasks.splice(idx, 1)
      saveTasksInLocalStorage(tasks)
    }
  }

  return {
    initFromUserStorage: initStorage,
    getTasksFromUserStorage: getTasksFromLocalStorage,
    addTaskToUserStorage: addTaskToLocalStorage,
    updateTaskInUserStorage: updateTaskInLocalStorage,
    deleteTaskFromUserStorage: deleteTaskFromLocalStorage,
  }
}
