import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AlertService} from "../../services/alert/alert.service";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private alertService : AlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            this.alertService.error(error.error.message || 'Error en la petición');
            break;
          case 401:
            this.alertService.warning(error.error.message || 'No estás autorizado');
            break;
          case 403:
            this.alertService.error(error.error.message || 'No tienes permiso para realizar esta acción');
            break;
          case 404:
            this.alertService.info(error.error.message || 'El recurso solicitado no fue encontrado');
            break;
          case 500:
            this.alertService.error('Tenemos problemas, reintenta más tarde...');
            break;
          default:
            this.alertService.error('Ocurrió un error inesperado, intente nuevamente');
            break;
        }
        return throwError(error);
      })
    );
  }

}
