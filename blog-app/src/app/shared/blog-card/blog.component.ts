import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Blog } from '../../schemas/blog.shema';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [
      CommonModule,
      MatCardModule,
      MatButtonModule,
      RouterModule,
      MatIconModule
    ],
})
export class BlogComponent {
  @Input() blogEntry!: Blog;

  setCursor(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.focus();
  }
}
