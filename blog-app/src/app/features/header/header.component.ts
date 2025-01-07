import { Component, OnInit, signal, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
})
export class HeaderComponent implements OnInit {
  userName = signal<string | null>(null);
  isAuthenticated = signal<boolean>(false);
  hasUserRole = signal<boolean>(false);

  private oidcSecurityService = inject(OidcSecurityService);

  constructor() {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated.set(isAuthenticated);

      if (isAuthenticated) {
        this.oidcSecurityService.userData$.subscribe((userData) => {
          this.userName.set(
            userData?.userData?.preferred_username || 'Unknown User'
          );

          const roles = userData?.userData?.roles || [];
          this.hasUserRole.set(roles.includes('user'));
        });
      } else {
        this.userName.set(null);
        this.hasUserRole.set(false);
      }
    });
  }

  login(): void {
    this.oidcSecurityService.authorize();
  }

  logout(): void {
    this.oidcSecurityService.logoff().subscribe();
  }
}
