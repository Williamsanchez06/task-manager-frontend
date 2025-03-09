import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {Task} from "../../../interfaces/tasks.interface";
import { delay } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import {TaskResponse} from "../../../interfaces/tasks.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    // Se generan 20 tareas de ejemplo
    for (let i = 1; i <= 20; i++) {
      this.tasks.push({
        id: uuidv4(),
        title: `Tarea ${i}`,
        description: `Descripción de la tarea ${i}`,
        status: i % 2 === 0 ? 'COMPLETADO' : 'PENDIENTE',
        createdAt: new Date(),
        updatedAt: new Date(),
        ownerId: 'user-1'
      });
    }
  }

  // Simula una consulta al backend con paginación y búsqueda
  getTasks(page: number, pageSize: number, search: string): Observable<TaskResponse> {
    let filteredTasks = this.tasks;
    if (search) {
      filteredTasks = filteredTasks.filter(task =>
        task.status.toLowerCase().includes(search.toLowerCase())
      );
    }
    const total = filteredTasks.length;
    const startIndex = (page - 1) * pageSize;
    const tasksPage = filteredTasks.slice(startIndex, startIndex + pageSize);
    return of({ tasks: tasksPage, total }).pipe(delay(500));
  }

  // Simula la creación de una tarea
  createTask(taskData: Partial<Task>): Observable<Task> {
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title || '',
      description: taskData.description || '',
      status: 'PENDIENTE',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 'user-1'
    };
    this.tasks.push(newTask);
    return of(newTask).pipe(delay(500));
  }

  // Simula la actualización de una tarea
  updateTask(taskId: string, taskData: Partial<Task>): Observable<Task> {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      this.tasks[index] = {
        ...this.tasks[index],
        ...taskData,
        updatedAt: new Date()
      };
      return of(this.tasks[index]).pipe(delay(500));
    }
    return throwError('Task not found').pipe(delay(500));
  }
}
