// blog.component.ts
import { Component, Input } from '@angular/core';
import { BlogEntry } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  @Input() blogEntry!: BlogEntry;
}
