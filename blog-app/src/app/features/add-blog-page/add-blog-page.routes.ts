import { Routes } from '@angular/router';
import { AddBlogPageComponent } from './add-blog-page.component';
import { isAuthenticatedGuard } from '../../core/guards/auth.guard';

const AddBlogRoutes: Routes = [
  {
    path: '',
    component: AddBlogPageComponent,
  },
];
export default AddBlogRoutes;