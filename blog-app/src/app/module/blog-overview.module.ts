import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogOverviewComponent } from '../components/blog/blog-overview/blog-overview.component';
import { BlogOverviewRoutingModule } from './blog-overwiev-routing.module';
import { BlogModule } from './blog.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BlogOverviewComponent],
  imports: [
    CommonModule,
    BlogOverviewRoutingModule,
    BlogModule,
    MatIconModule
  ],
   exports: [
    BlogOverviewComponent
  ]
})
export class BlogOverviewModule { }