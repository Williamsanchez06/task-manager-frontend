import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth/auth.interceptor";
import {HttpErrorInterceptorInterceptor} from "./interceptors/http/http-error-interceptor.interceptor";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorInterceptor, multi: true}
  ]

})
export class CoreModule { }
