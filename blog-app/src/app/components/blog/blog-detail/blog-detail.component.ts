import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  BlogDetails } from '../../../schemas/blog.shema';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
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

