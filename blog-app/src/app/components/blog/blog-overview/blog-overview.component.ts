import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog.service';
import { Blog } from '../../../schemas/blog.shema';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss']
})
export class BlogOverviewComponent implements OnInit {
  blogEntries: Blog[] = [];
  fallBackImageUrl = 'https://picsum.photos/800/200';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
    this.blogService.getEntries().subscribe({
      next: (response) => {
        this.blogEntries = response.data.map((blog) => ({
          ...blog,
          headerImageUrl: blog.headerImageUrl || this.fallBackImageUrl,
        }));
      },
    });
  }
}
