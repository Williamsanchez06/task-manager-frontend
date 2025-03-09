import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TaskIResponse,
  TaskRequestCreate, TaskRequestUpdate,
  UserResponse
} from "../interfaces/tasks.interface";
import {environment} from "../../../../../../environments/environment";
import {EndPoints} from "../../../../../core/utils/end-point";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtener tareas del usuario autenticado con paginación y búsqueda
  getTasks(page: number, pageSize: number, search: string = ''): Observable<TaskIResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('search', search);

    return this.http.get<TaskIResponse>(`${this.apiUrl}${EndPoints.TASKS}`, { params });
  }

  createTask(taskData: TaskRequestCreate ): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${EndPoints.TASKS}`, taskData);
  }

  updateTask( taskId : string, taskData: TaskRequestUpdate ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}`, taskData);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}`);
  }

  shareTask(taskId: string, sharedUserId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}/share`, { sharedUserId });
  }

  getUser(): Observable<UserResponse>  {
    return this.http.get<UserResponse>(`${this.apiUrl}${EndPoints.GET_USERS}`);
  }

}
