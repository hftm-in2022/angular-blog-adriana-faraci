import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BlogComponent } from './shared/blog-card/blog.component';
import { SideBarComponent } from './features/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports:[
      CommonModule,
      BlogComponent,
      MatToolbarModule,
      SideBarComponent],
})
export class AppComponent {
}
