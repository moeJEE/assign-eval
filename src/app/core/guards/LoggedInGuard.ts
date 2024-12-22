import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Check if the userRole exists in sessionStorage
    const userRole = sessionStorage.getItem('userRole');

    if (userRole) {
      // Redirect the user to their respective dashboard
      if (userRole.toLowerCase() === 'developer') {
        this.router.navigate(['/developer-dashboard']);
    } else if (userRole.toLowerCase() === 'project_manager') {
        this.router.navigate(['/project-manager-dashboard']);
    } else {
        this.router.navigate(['/auth/error']);
    }
      return false; // Prevent access to the login/register/valid pages
    }

    return true; // Allow access if no session exists
  }
}
