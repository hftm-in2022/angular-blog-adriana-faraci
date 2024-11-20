import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Import MatCardModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { RouterModule } from '@angular/router';
import { BlogComponent } from '../components/blog/blog.component';
import { BlogDetailComponent } from '../components/blog/blog-detail/blog-detail.component'; // Import BlogDetailComponent
import { MatIconModule } from '@angular/material/icon';
import { BlogOverviewComponent } from '../components/blog/blog-overview/blog-overview.component';

@NgModule({
  declarations: [
    BlogComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    BlogComponent
  ]
})
export class BlogModule {}