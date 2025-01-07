
import { Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail.component';
import { BlogResolver } from '../../resolver/blog.resolver';

const BlogDetailRoutes: Routes = [
  {
    path: 'blog/detail/:id',
    component: BlogDetailComponent,
    resolve: { blog: BlogResolver },
  },
];
export default BlogDetailRoutes;