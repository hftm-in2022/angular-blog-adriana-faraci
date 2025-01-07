import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Entries } from '../../schemas/blog.shema';
import { BlogCardComponent } from '../../shared/blog-card/blog-card.component';
@Component({
  selector: 'app-blog-overview',
  standalone: true,
  imports: [AsyncPipe, RouterLink, BlogCardComponent],
  templateUrl: './blog-overview.component.html',
  styleUrl: './blog-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogOverviewComponent {
  model = input.required<Entries>();
}