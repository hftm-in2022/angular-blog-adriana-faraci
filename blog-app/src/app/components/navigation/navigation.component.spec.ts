import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation.component';
import { NavigationModule } from '../../module/navigation.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (key: string) => 'mockId'
      }
    },
    params: of({ id: 'mockId' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavigationModule,
        BrowserAnimationsModule
      ],
      declarations: [NavigationComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});