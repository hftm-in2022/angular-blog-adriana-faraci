import { Component, ViewChild, inject } from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { signal } from '@angular/core';
import { Observable, Subject, map, shareReplay } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ProgressStateService } from '../../core/services/progress.state.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    AsyncPipe,
  ],
})
export class NavigationComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  userName = signal<string | null>(null);
  isAuthenticated = signal<boolean>(false);

  private oidcSecurityService = inject(OidcSecurityService);
  private breakpointObserver = inject(BreakpointObserver);
  private progressStateService = inject(ProgressStateService);
  private destroy$ = new Subject<void>();
  isLoading = this.progressStateService.isLoading;


   isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 912px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );


  constructor() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated.set(isAuthenticated);

      if (isAuthenticated) {
        this.oidcSecurityService.userData$.subscribe((userData) => {
          this.userName.set(
            userData?.userData?.preferred_username || 'Unknown User'
          );
        });
      } else {
        this.userName.set(null);
      }
    });
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

   ngonDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
