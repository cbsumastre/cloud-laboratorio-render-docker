import type { Task, Storage } from '@/types'
import { ref } from 'vue'

const databaseName = 'todo-app-vue-database'

export const useTasksDB = (): Storage => {
  const tasks = ref<Task[]>([])
  const db = ref<IDBDatabase | undefined>(undefined)

  const openDB = () => {
    console.log('openDB')
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(databaseName, 1)

      request.onsuccess = (event) => {
        db.value = (event.target as IDBOpenDBRequest).result
        console.log('openDB onsuccess', db.value.name)
        resolve(db.value)
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        console.log('openDB onupgradeneeded', db.name)
        db.createObjectStore(databaseName, { keyPath: 'id' })
      }

      request.onerror = (event: Event) => {
        const error = (event.target as IDBOpenDBRequest).error
        console.error(`Error al abrir la base de datos ${databaseName} ${error}`)
        reject(`Error al abrir la base de datos ${databaseName} ${error}`)
      }
    })
  }

  const getTasksFromDB = async () => {
    console.log('getTasksFromDB')
    if (!db.value) {
      return []
    }

    return new Promise<Task[]>((resolve, reject) => {
      const transaction = db.value!.transaction([databaseName], 'readonly')
      const objectStore = transaction.objectStore(databaseName)
      const request = objectStore.getAll()

      request.onsuccess = (event: Event) => {
        const tasks = (event.target as IDBRequest<Task[]>).result
        const sortedTasks: Task[] = tasks.sort((a, b) => {
          return a.ts.getTime() - b.ts.getTime()
        })
        console.log('getTasksFromDB onsuccess ', sortedTasks)
        resolve(sortedTasks)
      }

      request.onerror = (event: Event) => {
        const error = (event.target as IDBRequest<Task[]>).error
        console.error(`Error al cargar las tareas: ${error}`)
        reject(`Error al cargar las tareas: ${error}`)
      }
    })
  }

  const loadTasks = async () => {
    console.log('loadTasks')
    const data = await getTasksFromDB()
    tasks.value = data ?? []
  }

  const init = async () => {
    await openDB()
    await loadTasks()
  }

  const addTaskDB = async (task: Task) => {
    if (!db.value) {
      return
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = db.value!.transaction([databaseName], 'readwrite')
      const objectStore = transaction.objectStore(databaseName)
      const request = objectStore.add(task)

      request.onsuccess = () => {
        loadTasks()
        resolve()
      }

      request.onerror = (event) => {
        const error = (event.target as IDBRequest).error
        console.error(`Error al agregar la tarea: ${error}`)
        reject(`Error al agregar la tarea: ${error}`)
      }
    })
  }

  const updateTaskDB = async (task: Task) => {
    if (!db.value) {
      return
    }

    return new Promise<void>((resolve, reject) => {
      const transaction = db.value!.transaction([databaseName], 'readwrite')
      const objectStore = transaction.objectStore(databaseName)
      const request = objectStore.put(task)

      request.onsuccess = () => {
        loadTasks()
        resolve()
      }

      request.onerror = (event) => {
        const error = (event.target as IDBRequest).error
        reject(`Error al actualizar la tarea: ${error}`)
      }
    })
  }

  const deleteTaskDB = async (id: string) => {
    if (!db.value) return

    return new Promise<void>((resolve, reject) => {
      const transaction = db.value!.transaction([databaseName], 'readwrite')
      const objectStore = transaction.objectStore(databaseName)
      const request = objectStore.delete(id)

      request.onsuccess = () => {
        loadTasks()
        resolve()
      }

      request.onerror = (event) => {
        const error = (event.target as IDBRequest).error
        reject(`Error al eliminar la tarea: ${error}`)
      }
    })
  }

  return {
    initFromUserStorage: init,
    getTasksFromUserStorage: getTasksFromDB,
    addTaskToUserStorage: addTaskDB,
    updateTaskInUserStorage: updateTaskDB,
    deleteTaskFromUserStorage: deleteTaskDB,
  }
}
