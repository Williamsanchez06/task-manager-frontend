export type TaskStatus = 'PENDIENTE' | 'COMPLETADO';

export interface TasksI {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

export interface TaskIResponse {
  message: string;
  tasks: TasksI[];
  total: number;
}

export interface TaskBase {
  title: string;
  description: string;
  status: TaskStatus;
}
export interface TaskRequestCreate extends TaskBase {}

export interface TaskRequestUpdate extends Partial<TaskBase> {}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserResponse {
  message: string;
  data: User[];
}
