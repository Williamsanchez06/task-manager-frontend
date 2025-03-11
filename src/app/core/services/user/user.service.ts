import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {EndPoints} from "../../utils/end-point";
import {UserResponse} from "../../interfaces/user.interface";
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
