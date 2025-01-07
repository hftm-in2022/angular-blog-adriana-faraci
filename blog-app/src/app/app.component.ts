import { Component } from '@angular/core';
import { NavigationComponent } from './features/navigation/navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule,NavigationComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'My Angular App';
}
