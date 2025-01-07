import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { BlogDetails } from '../../schemas/blog.shema';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule, // Für die date-Pipe
    RouterModule,
    MatIconModule,
    RouterLink
  ],
})
export class BlogDetailComponent implements OnInit {
  blog?: BlogDetails;
  showComments = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.blog = data['blog'];
      }
    });
  }

navigateBack(): void {
  this.router.navigate(['']); 
}

  toggleComments() {
    this.showComments = !this.showComments;
  }
}

