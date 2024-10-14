import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  
  const isLoggedIn = auth.showStatus();
  const userRole = auth.getRole();
  const allowedRoles = route.data['roles'] as Array<string>;

  if (isLoggedIn) {
    if (allowedRoles && allowedRoles.indexOf(userRole) === -1) {
      // Role not authorized
      router.navigate(['/login']);
      return false;
    }
    return true;
  }

  // Not logged in
  router.navigate(['/login']);
  return false;
};
