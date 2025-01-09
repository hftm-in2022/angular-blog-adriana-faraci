import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../core/services/blog.service';
import { BlogTitleValidator } from '../../shared/validators/blog-title.validator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressStateService } from '../../core/services/progress.state.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog-page.component.html',
  styleUrls: ['./add-blog-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class AddBlogPageComponent {
  blogForm: FormGroup;
  isSaving = false;
  uploadError: string | null = null;
  headerImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private blogTitleValidator: BlogTitleValidator,
    public progressStateService: ProgressStateService
  ) {
    this.blogForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this.blogTitleValidator.validate.bind(this.blogTitleValidator)],
      ],
      content: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get title() {
    return this.blogForm.get('title');
  }

  get content() {
    return this.blogForm.get('content');
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadError = null;
      const reader = new FileReader();
      reader.onload = () => {
        this.headerImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.uploadError = 'Kein gültiges Bild ausgewählt.';
    }
  }

  // Blog speichern
  onSave() {
    if (this.blogForm.invalid) return;

    this.isSaving = true;

    const blogData = {
      ...this.blogForm.value,
      headerImageUrl: this.headerImageUrl,
    };

    this.blogService.saveBlog(blogData).subscribe(
      () => {
        alert('Blog erfolgreich gespeichert!');
        this.blogForm.reset();
        this.headerImageUrl = null;
        this.isSaving = false;
      },
      () => {
        alert('Fehler beim Speichern des Blogs.');
        this.isSaving = false;
      }
    );
  }

  onReset() {
    this.blogForm.reset();
    this.headerImageUrl = null; 
  }
}
