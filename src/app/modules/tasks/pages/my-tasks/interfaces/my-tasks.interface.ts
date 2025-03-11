import {TasksI} from "../../../interfaces/tasks.interface";

export interface TaskIResponse {
  message: string;
  tasks: TasksI[];
  total: number;
}
