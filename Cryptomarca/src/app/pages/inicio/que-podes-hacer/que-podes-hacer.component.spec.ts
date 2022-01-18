import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuePodesHacerComponent } from './que-podes-hacer.component';

describe('QuePodesHacerComponent', () => {
  let component: QuePodesHacerComponent;
  let fixture: ComponentFixture<QuePodesHacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuePodesHacerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuePodesHacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
