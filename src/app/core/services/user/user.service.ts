import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";
import {EndPoints} from "../../utils/end-point";
import {UserResponse} from "../../interfaces/user.interface";
import {UserResponseRegister} from "../../interfaces/auth.interface";
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserResponse>  {
    return this.http.get<UserResponse>(`${this.apiUrl}${EndPoints.GET_USERS}`);
  }

  register(name: string, email: string, password: string) : Observable<UserResponseRegister> {
    return this.http.post<UserResponseRegister>(`${this.apiUrl}${EndPoints.CREATE_USER}`, { name, email, password });
  }

}
