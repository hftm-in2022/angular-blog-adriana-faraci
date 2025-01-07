import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { Blog } from '../../schemas/blog.shema';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule,MatCardModule, MatButtonModule, MatIcon, RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCardComponent {
  @Input() blogEntry!: Blog;

   constructor(private router: Router) {}
  setCursor(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.focus();
  }

   onCardClick(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('button')) {
      this.router.navigate(['/blog/detail', this.blogEntry.id]);
      console.log(this.blogEntry.id + "halloo")
    }
  }
}
