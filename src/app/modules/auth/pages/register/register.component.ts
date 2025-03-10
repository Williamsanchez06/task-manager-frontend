import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {AlertService} from "../../../../core/services/alert/alert.service";
import {RegisterService} from "../../services/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword:boolean = true;
  hideConfirmPassword:boolean = true;

  constructor(private fb: FormBuilder,
              private router:Router,
              private alertService: AlertService,
              private registerService: RegisterService
  ) {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  onRegister(): void {

    if (this.registerForm.invalid) {
      this.alertService.error('Por favor, completa los campos.');
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password, name, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.alertService.error('Las contraseñas deben ser iguales.');
      return;
    }

    this.registerService.register(name, email, password).subscribe({
      next: () => {
        this.alertService.success('Usuario creado exitosamente. Por favor, inicia sesión.');
        this.router.navigate(['/login']);
      }
    });

  }
}
