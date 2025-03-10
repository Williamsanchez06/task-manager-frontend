import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {UserResponse} from "../interfaces/tasks.interface";
import {EndPoints} from "../../../core/utils/end-point";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserResponse>  {
    return this.http.get<UserResponse>(`${this.apiUrl}${EndPoints.GET_USERS}`);
  }

}
