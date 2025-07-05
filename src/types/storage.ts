import type { Task } from './task'

export interface Storage {
  initFromUserStorage: () => Promise<void>
  getTasksFromUserStorage: () => Promise<Task[]>
  addTaskToUserStorage: (task: Task) => Promise<void>
  updateTaskInUserStorage: (task: Task) => Promise<void>
  deleteTaskFromUserStorage: (id: string) => Promise<void>
}
