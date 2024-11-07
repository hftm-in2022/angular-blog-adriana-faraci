import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { BlogOverviewComponent } from './blog-overview.component';
import { loggingInterceptor } from '../../../interceptors/logging.interceptor';

describe('BlogOverviewComponent', () => {
  let component: BlogOverviewComponent;
  let fixture: ComponentFixture<BlogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogOverviewComponent],
      imports: [
        MatCardModule,
        CommonModule,
      ],
      providers: [BlogService, provideHttpClient(withInterceptors([loggingInterceptor]))] // BlogService bereitstellen, wenn nötig
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
