import { Injectable } from '@angular/core';
import { OidcSecurityService, AuthenticatedResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff();
  }

  get isAuthenticated(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map((result: AuthenticatedResult) => result.isAuthenticated)
    );
  }

  get userName$(): Observable<string | null> {
    return this.oidcSecurityService.userData$.pipe(
      map((userData) => userData?.userData?.name || null)
    );
  }
}
