import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TaskRequestCreate, TaskRequestUpdate, TasksI } from '../interfaces/tasks.interface';
import { TaskService } from './task.service';
import { MyTaskService } from '../pages/my-tasks/services/my-task.service';
import { ReceivedTaskService } from '../pages/received-tasks/services/received-task.service';
import { TaskI } from '../pages/received-tasks/interfaces/received-tasks.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksStoreService {
  // Estado global para las tareas propias
  private tasksSubject = new BehaviorSubject<TasksI[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  // Estado global para las tareas compartidas
  private sharedTasksSubject = new BehaviorSubject<TaskI[]>([]);
  sharedTasks$ = this.sharedTasksSubject.asObservable();

  // Total de registros para tareas propias
  private totalRecordsSubject = new BehaviorSubject<number>(0);
  totalRecords$ = this.totalRecordsSubject.asObservable();

  // Total de registros para tareas compartidas
  private totalSharedRecordsSubject = new BehaviorSubject<number>(0);
  totalSharedRecords$ = this.totalSharedRecordsSubject.asObservable();

  constructor(
    private myTaskService: MyTaskService,
    private taskService: TaskService,
    private receivedTaskService: ReceivedTaskService
  ) {}

  // Cargar tareas propias
  loadUserTasks(page: number, pageSize: number, search: string = ''): void {
    this.myTaskService.getTasks(page, pageSize, search).subscribe(response => {
      this.tasksSubject.next(response.tasks);
      this.totalRecordsSubject.next(response.total);
    });
  }

  // Cargar tareas compartidas y actualizar el estado global
  loadSharedTasks(page: number, pageSize: number): void {
    this.receivedTaskService.getSharedTasks(page, pageSize).subscribe(response => {
      this.sharedTasksSubject.next(response.tasks);
      this.totalSharedRecordsSubject.next(response.total);
    });
  }

  // Crear una tarea (para tareas propias)
  createTask(taskData: TaskRequestCreate): Observable<TasksI> {
    return this.myTaskService.createTask(taskData).pipe(
      tap((newTask: TasksI) => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, newTask]);
      })
    );
  }

  // Actualizar una tarea (para tareas propias)
  updateTask(taskId: string, taskData: TaskRequestUpdate): Observable<TasksI> {
    return this.taskService.updateTask(taskId, taskData).pipe(
      tap((updatedTask: TasksI) => {
        const currentTasks = this.tasksSubject.value;
        const updatedList = currentTasks.map(t => t.id === taskId ? updatedTask : t);
        this.tasksSubject.next(updatedList);
      })
    );
  }

  // Eliminar una tarea (para tareas propias)
  deleteTask(taskId: string): Observable<any> {
    return this.taskService.deleteTask(taskId).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.value;
        const updatedList = currentTasks.filter(t => t.id !== taskId);
        this.tasksSubject.next(updatedList);
      })
    );
  }

  // compartir una tarea y actualizar el estado global
  shareTask(taskId: string, sharedUserId: string): Observable<any> {
    return this.taskService.shareTask(taskId, sharedUserId).pipe(
      tap(() => {
        this.receivedTaskService.getSharedTasks(1, 10).subscribe(response => {
          this.sharedTasksSubject.next(response.tasks);
          this.totalSharedRecordsSubject.next(response.total);
        });
      })
    );
  }

}
