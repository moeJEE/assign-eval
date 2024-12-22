import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 100%;
        padding: 1rem;
      }
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        // Save the token and role in localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.role);

        // Redirect based on the role
        if (response.role === 'DEVELOPER') {
          this.router.navigate(['/developer-dashboard']);
        } else if (response.role === 'PROJECT_MANAGER') {
          this.router.navigate(['/project-manager-dashboard']);
        } else {
          this.router.navigate(['/auth/error']);
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error during login:', err);
        alert('Login failed. Please try again.');
      },
    });
  }
}
