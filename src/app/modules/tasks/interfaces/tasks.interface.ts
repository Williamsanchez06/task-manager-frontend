export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'PENDIENTE' | 'COMPLETADO';
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
}

export interface TaskResponse {
  tasks: Task[];
  total: number;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}
