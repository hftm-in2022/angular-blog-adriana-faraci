import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Blog } from '../../schemas/blog.shema';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogEntries: Blog[] = [];
  fallBackImageUrl = 'https://picsum.photos/800/200';

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
       this.blogService.getEntries().subscribe({
      next: (response) => {
          this.blogEntries = response.data.map((blog: any) => ({
          title: blog.title,
          id: blog.id,
          contentPreview: blog.contentPreview,
          author: blog.author,
          likes: blog.likes,
          comments: blog.comments,
          likedByMe: blog.likedByMe,
          createdByMe: blog.createdByMe,
          createdAt: blog.createdAt,
          headerImageUrl: blog.headerImageUrl
        }));
      },
    });
  }
}
