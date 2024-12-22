import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

// Define the API URL
@Injectable({
  providedIn: 'root', // provided in the root module
})
export class AuthService {
  private apiUrl = 'http://localhost:8088/api/v1/auth'; // Backend API URL
  private userRole: string = ''; // In-memory storage for user role

  constructor(private http: HttpClient) {}

  // Register a new user
  register(registrationData: { firstname: string; lastname: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registrationData);
  }

  // Authenticate user and get a token
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap((response: any) => {
        // Assuming the response contains a token and a role
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', response.role); // Save the role in localStorage
      })
    );
  }

  // Validate activation code
  validateCode(code: string): Observable<{ role: string }> {
    return this.http.get<{ role: string }>(`${this.apiUrl}/activate-account?token=${code}`);
  }

  // Save user session
  saveSession(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.setUserRole(role);
  }

  // Set the user role in memory
  setUserRole(role: string): void {
    this.userRole = role;
  }

  // Get the user role from memory or storage
  getUserRole(): string {
    if (!this.userRole) {
      this.userRole = localStorage.getItem('role') || '';
    }
    return this.userRole;
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // A token exists in storage
  }

  // Clear session data
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.userRole = '';
  }
}
