import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/interfaces/responses/auth-responses';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: LoginResponse) => {
        const token = response?.token ?? '';
        this.setLocalData(token);
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        const msg = error?.error?.msg ?? 'Error during request';
        alert(msg);
      },
    });
  }

  private setLocalData(token: string) {
    localStorage.setItem('token', token);
  }

  private resetForm(): void {
    this.loginForm.reset();
    this.clearFieldErrors('email');
    this.clearFieldErrors('password');
  }

  private clearFieldErrors(field: string): void {
    this.loginForm.get(field)?.setErrors(null);
  }
}
