import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuharVokComponent } from './kuhar-vok.component';

describe('KuharVokComponent', () => {
  let component: KuharVokComponent;
  let fixture: ComponentFixture<KuharVokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KuharVokComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KuharVokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
