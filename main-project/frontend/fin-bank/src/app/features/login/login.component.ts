import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrected from styleUrl to styleUrls
  providers: [LoginService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: LoginService, // Inject AuthService
    private snackBar: MatSnackBar,
    private router: Router // Inject Router for navigation
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required], // Default role is 'user'
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Send login request with role (user or admin)
      const { email, password, role } = this.loginForm.value;
      this.authService.login({ email, password, role }).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.snackBar.open('Login Successful as ' + role, 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          // Navigate based on role (user/admin)
          if (role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.snackBar.open('Login failed: ' + err.error.message, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
        },
      });
    } else {
      this.snackBar.open('Please fill out the form correctly.', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }
}
