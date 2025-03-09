import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {EndPoints} from "../../../core/utils/end-point";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}${EndPoints.CREATE_USER}`, { name, email, password });
  }

}
