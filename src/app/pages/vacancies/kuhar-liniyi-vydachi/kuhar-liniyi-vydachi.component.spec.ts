import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuharLiniyiVydachiComponent } from './kuhar-liniyi-vydachi.component';

describe('KuharLiniyiVydachiComponent', () => {
  let component: KuharLiniyiVydachiComponent;
  let fixture: ComponentFixture<KuharLiniyiVydachiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuharLiniyiVydachiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KuharLiniyiVydachiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
