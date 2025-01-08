import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BlogService } from '../../core/services/blog.service';
import { BlogTitleValidator } from '../../shared/validators/blog-title.validator';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
  standalone: true,
  imports:[CommonModule,RouterModule,ReactiveFormsModule]
})
export class AddBlogPageComponent {
  blogForm: FormGroup;
  isSaving = false; // Spinner Status

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private blogTitleValidator: BlogTitleValidator
  ) {
    this.blogForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this.blogTitleValidator.validate.bind(this.blogTitleValidator)], // Asynchroner Validator
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

  onSave() {
    if (this.blogForm.invalid) return;

    this.isSaving = true;

    const blogData = this.blogForm.value;
    this.blogService
      .saveBlog(blogData)
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe(
        () => {
          alert('Blog erfolgreich gespeichert!');
          this.blogForm.reset();
        },
        () => {
          alert('Fehler beim Speichern des Blogs.');
        }
      );
  }

  onReset() {
    this.blogForm.reset();
  }
}
