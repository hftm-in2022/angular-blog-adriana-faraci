import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from '../features/add-blog/add-blog.component';

const routes: Routes = [
  {
    path: '',
    component: AddBlogComponent
  }
];

@NgModule({
  declarations: [AddBlogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AddBlogPageModule { }