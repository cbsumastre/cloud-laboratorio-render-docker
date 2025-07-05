export enum TaskStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface Task {
  id: string
  title: string
  ts: Date
  status: TaskStatus
}
