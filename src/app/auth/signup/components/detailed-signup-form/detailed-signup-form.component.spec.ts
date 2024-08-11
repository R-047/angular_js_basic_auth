import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSignupFormComponent } from './detailed-signup-form.component';

describe('DetailedSignupFormComponent', () => {
  let component: DetailedSignupFormComponent;
  let fixture: ComponentFixture<DetailedSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedSignupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
