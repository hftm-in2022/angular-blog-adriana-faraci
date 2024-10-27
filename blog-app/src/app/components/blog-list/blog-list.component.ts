import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { BlogEntry } from '../../models/blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  blogEntries: BlogEntry[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadBlogEntries();
  }

  loadBlogEntries(): void {
    this.blogService.getEntries(0, 10).subscribe({
      next: (response) => {
        this.blogEntries = response.data;
      },
      error: (error) => {
        console.error('Fehler beim Laden der Blog-Einträge:', error);
      }
    });
  }
}
