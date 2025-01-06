import { provideAuth } from 'angular-auth-oidc-client';
import { AuthInterceptor } from 'angular-auth-oidc-client';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
 
export const authProviders = [
  provideAuth({
    config: {
      authority:
        'https://d-cap-keyclaok.kindbay-711f60b2.westeurope.azurecontainerapps.io/realms/blog',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'spa-blog',
      scope: 'openid profile email offline_access blogs',
      responseType: 'code',
      silentRenew: true,
      silentRenewUrl: window.location.origin + '/silent-renew.html',
      renewTimeBeforeTokenExpiresInSeconds: 10,
      secureRoutes: [environment.serviceUrl],
    },
  }),
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
 
