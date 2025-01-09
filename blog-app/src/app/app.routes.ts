import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/auth.guard';
import { ErrorPageComponent } from './features/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
      loadChildren: () =>
      import('./features/blog-overview/blog-overview.routes'),
  },
  {
    path: 'blogs',
      loadChildren: () =>
      import('./features/blog-overview/blog-overview.routes'),
  },
  {
    path: 'blog/detail',
    loadChildren: () => import('./features/blog-details/blog-detail.routes')
  },
  {
    path: 'blog/add',
    loadChildren: () => import('./features/add-blog-page/add-blog-page.routes'),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }