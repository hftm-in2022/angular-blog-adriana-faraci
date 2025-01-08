import { Component, ViewChild, inject, signal } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Subject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Für async-Pipe
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component'; // Header-Komponente

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // Für die async-Pipe
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    HeaderComponent,
    RouterModule
  ],
})
export class NavigationComponent {
  @ViewChild(MatDrawer) drawer!: MatDrawer;

  isAuthenticated = signal(false); // Signal für Authentifizierungsstatus
  private oidcSecurityService = inject(OidcSecurityService);
  private breakpointObserver = inject(BreakpointObserver);
  private destroy$ = new Subject<void>();
  private router = inject(Router); // Router wird injiziert

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(['(max-width: 912px)'])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.isAuthenticated.set(isAuthenticated); 
    });
  }

  toggleDrawer() {
    this.drawer.toggle();
  }

  navigateToAddBlog() {
    if (this.isAuthenticated()) {
      this.router.navigate(['/blog/add']);
    } else {
      alert('Bitte loggen Sie sich ein, um einen Blog hinzuzufügen!');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
