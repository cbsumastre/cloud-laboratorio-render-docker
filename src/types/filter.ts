import { TaskStatus } from '@/types/task'

export interface Filter {
  status?: TaskStatus
  title?: string
}
