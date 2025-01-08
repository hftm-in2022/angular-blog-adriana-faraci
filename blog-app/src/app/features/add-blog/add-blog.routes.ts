import { Routes } from '@angular/router';
import { AddBlogPageComponent } from './add-blog.component';
import { isAuthenticatedGuard } from '../../core/guards/auth.guard';

const AddBlogRoutes: Routes = [
  {
    path: 'add',
    component: AddBlogPageComponent,
    canActivate: [isAuthenticatedGuard]
  },
];
export default AddBlogRoutes;