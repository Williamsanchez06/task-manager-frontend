export type TaskStatus = 'PENDIENTE' | 'COMPLETADO';

export interface TaskBase {
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskRequestCreate extends TaskBase {}

export interface TaskRequestUpdate extends Partial<TaskBase> {}

export interface TasksI {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  ownerId: string;
  sharedUserId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskDeleteResponse {
  message: string;
}

export interface TaskUpdateResponse extends TasksI {}

export interface TaskSharedResponse extends TasksI {}


