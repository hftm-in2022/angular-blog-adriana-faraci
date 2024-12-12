import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUser: boolean = false;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService.userData$.subscribe(userData => {
      this.isUser = this.hasRole(userData, 'user');
    });
  }

  private hasRole(userData: any, role: string): boolean {
    return userData && userData.role && userData.role.includes(role);
  }
}