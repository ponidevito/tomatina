import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatymoRazomComponent } from './donatymo-razom.component';

describe('DonatymoRazomComponent', () => {
  let component: DonatymoRazomComponent;
  let fixture: ComponentFixture<DonatymoRazomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatymoRazomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonatymoRazomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
