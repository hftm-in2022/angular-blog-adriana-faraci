import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogOverviewComponent } from '../components/blog/blog-overview/blog-overview.component';

const routes: Routes = [
  { path: '', component: BlogOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogOverviewRoutingModule { }