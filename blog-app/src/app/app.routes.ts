import { ResolveFn, Routes } from '@angular/router';
import { finalize, lastValueFrom } from 'rxjs';
import { inject } from '@angular/core';
import { isAuthenticatedGuard } from './core/guards/auth.guard';
import { BlogDetails, Entries } from './schemas/blog.shema';
import { BlogService } from './core/services/blog.service';
import { ProgressStateService } from './core/services/progress.state.service';

export const entriesResolver: ResolveFn<Entries> = async () => {
  const blogService = inject(BlogService);
  const loadingService = inject(ProgressStateService);

  loadingService.setLoadingState(true);
  return await lastValueFrom(
    blogService
      .getEntries()
      .pipe(finalize(() => loadingService.setLoadingState(false))),
  );
};

export const blogDetailResolver: ResolveFn<BlogDetails> = (route) => {
  const blogService = inject(BlogService);
  const idParam = route.paramMap.get('id');
  const loadingService = inject(ProgressStateService);
  const blogId = Number(idParam);

  loadingService.setLoadingState(true);
  return blogService
    .getBlogById(blogId)
    .pipe(finalize(() => loadingService.setLoadingState(false)));
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    loadChildren: () =>
      import('./features/blog-overview/blog-overview.routes'),
    resolve: { model: entriesResolver },
  },
  {
    path: 'detail',
    loadChildren: () =>
      import('./features/blog-detail/blog-detail.routes'),
  },
  {
    path: 'add',
    loadChildren: () => import('./features/add-blog-page/add-blog.routes'),
    canActivate: [isAuthenticatedGuard],
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
];