import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'blogs',
    loadChildren: () => import('./module/blog-overview.module').then(m => m.BlogOverviewModule)
  },
  {
    path: 'blog/detail',
    loadChildren: () => import('./module/blog-detail.module').then(m => m.BlogDetailModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }