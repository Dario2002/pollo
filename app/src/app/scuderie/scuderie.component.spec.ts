import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScuderieComponent } from './scuderie.component';

describe('ScuderieComponent', () => {
  let component: ScuderieComponent;
  let fixture: ComponentFixture<ScuderieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScuderieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScuderieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
