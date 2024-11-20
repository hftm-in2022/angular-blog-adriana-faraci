import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogDetailRoutingModule } from './blog-detail-routing.module';
import { BlogDetailComponent } from '../components/blog/blog-detail/blog-detail.component';
import { BlogModule } from './blog.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BlogDetailComponent],
  imports: [
    CommonModule,
    BlogDetailRoutingModule,
    BlogModule,
    MatIconModule
  ],
  exports: [
    BlogDetailComponent
  ]

})
export class BlogDetailModule { }