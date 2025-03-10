import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {TaskListResponse} from "../pages/received-tasks/interfaces/received-tasks";
import {EndPoints} from "../../../core/utils/end-point";

@Injectable({
  providedIn: 'root'
})
export class ReceivedTaskService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSharedTasks(page: number, pageSize: number): Observable<TaskListResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<TaskListResponse>(`${this.apiUrl}${EndPoints.TASKS}/shared`, { params });
  }

}
