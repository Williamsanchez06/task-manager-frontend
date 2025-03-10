import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {EndPoints} from "../../../core/utils/end-point";
import {TaskIResponse, TaskRequestCreate} from "../interfaces/tasks.interface";

@Injectable({
  providedIn: 'root'
})
export class MyTaskService {

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

}
