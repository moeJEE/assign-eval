import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = sessionStorage.getItem('userRole');

    if (!userRole) {
        // Redirect to login if no session exists
        this.router.navigate(['/auth/login']);
        return false;
    }

    const allowedRoles = route.data['roles'] as Array<string>;
    if (allowedRoles.includes(userRole.toLowerCase())) {
        return true;
    }

    // Redirect to error page if role mismatch
    this.router.navigate(['/auth/error']);
    return false;
}

}
