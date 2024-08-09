import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicSignupFormComponent } from './basic-signup-form.component';

describe('BasicSignupFormComponent', () => {
  let component: BasicSignupFormComponent;
  let fixture: ComponentFixture<BasicSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicSignupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
