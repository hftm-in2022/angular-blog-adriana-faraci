import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Blog } from '../../schemas/blog.shema';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
  @Input() blogEntry!: Blog;

  setCursor(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    target.focus();
  }
}
