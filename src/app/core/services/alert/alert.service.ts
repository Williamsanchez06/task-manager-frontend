import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private toast: ToastrService
  ) {
  }

  public success(message: string): void {
    this.toast.success(message, 'Éxito');
  }

  public info(message: string, timeOut?: number): void {
    const override = {timeOut: 5000};
    timeOut ? override.timeOut = timeOut : override;
    this.toast.info(message, 'Información', override);
  }

  public warning(message: string): void {
    this.toast.warning(message, 'Advertencia');
  }

  public error(message: string): void {
    this.toast.error(message, 'Error');
  }
}
