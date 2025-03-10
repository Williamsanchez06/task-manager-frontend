import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {EndPoints} from "../../../core/utils/end-point";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string) : Observable<any> {
    return this.http.post(`${this.apiUrl}${EndPoints.CREATE_USER}`, { name, email, password });
  }

}
