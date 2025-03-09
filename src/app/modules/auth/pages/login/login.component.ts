import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {AlertService} from "../../../../core/services/alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePassword: boolean = true;
  loader: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.alertService.error('Por favor, completa los campos.');
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loader = true;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(response => {
      if (response) {
        this.alertService.success('Inciaste sesión correctamente.');
        this.router.navigate(['/tasks']);
      }
      this.loader = false;
    });
  }
}
