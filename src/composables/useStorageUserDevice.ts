import type { Storage } from '@/types'
// import { useLocalStorage as useStorage } from './useLocalStorage'
import { useTasksDB as useStorage } from './useIndexedDB'

export const useStorageUserDevice = (): Storage => {
  const {
    initFromUserStorage,
    getTasksFromUserStorage,
    addTaskToUserStorage,
    updateTaskInUserStorage,
    deleteTaskFromUserStorage,
  } = useStorage()

  return {
    initFromUserStorage,
    getTasksFromUserStorage,
    addTaskToUserStorage,
    updateTaskInUserStorage,
    deleteTaskFromUserStorage,
  }
}
