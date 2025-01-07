import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app.routes';
import { BlogComponent } from './shared/blog-card/blog.component';
import { HeaderComponent } from './features/header/header.component';
import { NavigationComponent } from './features/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports:[
      CommonModule,
      BlogComponent,
      MatToolbarModule,
      HeaderComponent,
      NavigationComponent],
})
export class AppComponent {
}
