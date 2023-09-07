import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyMenuComponent } from './healthy-menu.component';

describe('HealthyMenuComponent', () => {
  let component: HealthyMenuComponent;
  let fixture: ComponentFixture<HealthyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthyMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
