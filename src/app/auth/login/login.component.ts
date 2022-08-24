import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: LoginResponse) => {
        this.resetForm();
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        const msg = error?.error?.msg ?? 'Error during request';
        alert(msg);
      },
    });
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
