import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'blogs',
    loadChildren: () => import('./module/blog-overview.module').then(m => m.BlogOverviewModule)
  },
  {
    path: 'blog/detail',
    loadChildren: () => import('./module/blog-detail.module').then(m => m.BlogDetailModule)
  },
    {
    path: 'add-blog',
    loadChildren: () => import('./module/add-blog-page.module').then(m => m.AddBlogPageModule),
    canActivate: [isAuthenticatedGuard] // Wende den neuen Guard auf die Route an
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }