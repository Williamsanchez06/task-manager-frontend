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

export interface TaskBase {
  title: string;
  description: string;
  status: TaskStatus;
}
export interface TaskRequestCreate extends TaskBase {}

export interface TaskRequestUpdate extends Partial<TaskBase> {}
