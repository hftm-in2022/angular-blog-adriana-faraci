import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [    CommonModule, // Für die async-Pipe
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterModule]
})
export class SideBarComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  isAuthenticated = signal(false);
  userName = signal<string | null>(null);
  hasUserRole = signal(false);

  private oidcSecurityService = inject(OidcSecurityService);
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 912px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor() {
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

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe();
  }
}
