import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentificationFormComponent } from './user-identification-form.component';

describe('UserIdentificationFormComponent', () => {
  let component: UserIdentificationFormComponent;
  let fixture: ComponentFixture<UserIdentificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserIdentificationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserIdentificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
