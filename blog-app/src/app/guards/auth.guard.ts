import { CanActivateFn } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Helper function to check if the user has a specific role.
 * @param roles - Array of roles assigned to the user.
 * @param roleToCheck - The role to check for.
 * @returns boolean - True if the user has the role, false otherwise.
 */
function hasRole(roles: string[], roleToCheck: string): boolean {
  return roles.includes(roleToCheck);
}

export const isAuthenticatedGuard: CanActivateFn = () => {
  const oidcSecurityService = inject(OidcSecurityService);

  // Check if the user is authenticated and retrieve user data
  return oidcSecurityService.isAuthenticated$.pipe(
    switchMap((authResult) => {
      if (!authResult.isAuthenticated) {
        return new Observable<boolean>((observer) => observer.next(false));
      }

      return oidcSecurityService.userData$.pipe(
        map((userData: any) => {
          const roles = userData?.roles || [];
          return hasRole(roles, 'user');
        })
      );
    })
  );
};
