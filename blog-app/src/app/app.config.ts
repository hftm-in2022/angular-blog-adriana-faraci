import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authProviders } from './core/auth/auth-config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { GlobalErrorHandler } from './core/services/global-error-handler.service';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    GlobalErrorHandler,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loggingInterceptor, errorInterceptor])),
    ...authProviders,
  ],
};