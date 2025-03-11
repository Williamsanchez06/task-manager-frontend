import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {
  TaskDeleteResponse,
  TaskRequestUpdate,
  TaskSharedResponse,
  TaskUpdateResponse
} from "../interfaces/tasks.interface";
import {EndPoints} from "../../../core/utils/end-point";
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updateTask(taskId: string, taskData: TaskRequestUpdate): Observable<TaskUpdateResponse> {
    return this.http.put<TaskUpdateResponse>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}`, taskData);
  }

  deleteTask(taskId: string): Observable<TaskDeleteResponse> {
    return this.http.delete<TaskDeleteResponse>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}`);
  }

  shareTask(taskId: string, sharedUserId: string): Observable<TaskSharedResponse> {
    return this.http.post<TaskSharedResponse>(`${this.apiUrl}${EndPoints.TASKS}/${taskId}/share`, { sharedUserId });
  }

}
