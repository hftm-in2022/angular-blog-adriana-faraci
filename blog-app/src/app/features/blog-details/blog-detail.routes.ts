import { Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogResolver } from '../../core/resolver/blog.resolver';

const BlogDetailRoutes: Routes = [
  {
    path: ':id',
    component: BlogDetailComponent,
    resolve: { blog: BlogResolver },
  },
];
export default BlogDetailRoutes;