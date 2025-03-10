import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {TaskRequestUpdate} from "../interfaces/tasks.interface";
import {EndPoints} from "../../../core/utils/end-point";
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateTask( taskId : string, taskData: TaskRequestUpdate ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}`, taskData);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}`);
  }

  shareTask(taskId: string, sharedUserId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}/share`, { sharedUserId });
  }

}
