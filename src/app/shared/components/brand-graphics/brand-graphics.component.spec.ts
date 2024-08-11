import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandGraphicsComponent } from './brand-graphics.component';

describe('BrandGraphicsComponent', () => {
  let component: BrandGraphicsComponent;
  let fixture: ComponentFixture<BrandGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrandGraphicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
