import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogStateService } from '../../state/Blog.state';
import { Observable } from 'rxjs';
import { Blog } from '../../schemas/blog.shema';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogListComponent implements OnInit {
  blogEntries$: Observable<Blog[]>;
  fallBackImageUrl = 'https://picsum.photos/800/200';

  constructor(private blogService: BlogService, private blogStateService: BlogStateService) {
    this.blogEntries$ = this.blogStateService.blogEntries$;
  }

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
    this.blogService.getEntries().subscribe({
      next: (response) => {
        const blogs = response.data.map((blog: any) => ({
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
        this.blogStateService.setBlogEntries(blogs);
      }
    });
  }
}
