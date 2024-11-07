import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from '../components/blog/blog-detail/blog-detail.component';
import { BlogResolver } from '../resolver/blog.resolver';

const routes: Routes = [
  { path: ':id',
    component: BlogDetailComponent,
    resolve: { blog: BlogResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogDetailRoutingModule { }