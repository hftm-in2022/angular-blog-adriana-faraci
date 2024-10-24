import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent // Deklarieren der Komponente im Modul
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
   MatIconModule,
  ],
  bootstrap: [AppComponent] // AppComponent als Bootstrap-Komponente
})
export class AppModule {}
