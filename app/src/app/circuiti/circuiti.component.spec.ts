import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitiComponent } from './circuiti.component';

describe('CircuitiComponent', () => {
  let component: CircuitiComponent;
  let fixture: ComponentFixture<CircuitiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircuitiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
