import {TasksI} from "../../../interfaces/tasks.interface";

export interface TaskIResponse {
  message: string;
  tasks: TasksI[];
  total: number;
}

export interface TaskCreateResponse extends TasksI {}
