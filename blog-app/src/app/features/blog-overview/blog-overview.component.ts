import { Component, OnInit } from '@angular/core';
import { Blog } from '../../schemas/blog.shema';
import { BlogComponent } from '../../shared/blog-card/blog.component';
import { BlogService } from '../../core/services/blog.service';
import { ProgressStateService } from '../../core/services/progress.state.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
  imports: [CommonModule,BlogComponent],
  standalone: true,
})
export class BlogOverviewComponent implements OnInit {
  blogEntries: Blog[] = [];
  fallBackImageUrl = 'https://picsum.photos/800/200';

  constructor(
    private blogService: BlogService,
    public progressStateService: ProgressStateService
  ) {}

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
    this.progressStateService.setLoadingState(true);
    this.blogService.getEntries().subscribe({
      next: (response) => {
        this.blogEntries = response.data.map((blog) => ({
          ...blog,
          headerImageUrl: blog.headerImageUrl || this.fallBackImageUrl,
        }));
        this.progressStateService.setLoadingState(false);
      },
      error: () => {
        this.progressStateService.setLoadingState(false);
      },
    });
  }
}

