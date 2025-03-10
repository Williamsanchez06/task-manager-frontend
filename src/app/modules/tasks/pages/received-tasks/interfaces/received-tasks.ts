export type TaskStatus = 'PENDIENTE' | 'COMPLETADO';

export interface TaskI {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
}

export interface TaskListResponse {
  tasks: TaskI[];
  total: number;
  page: number;
  pageSize: number;
}
