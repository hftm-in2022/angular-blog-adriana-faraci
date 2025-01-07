import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './core/guards/auth.guard';

export const routes: Routes = [
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
    path: 'add-blog-page',
    loadChildren: () => import('./module/add-blog-page.module').then(m => m.AddBlogPageModule),
    canActivate: [isAuthenticatedGuard]
  },
   {
    path: '**',
    redirectTo: 'overview',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }