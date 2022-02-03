import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMoneyComponent } from './section-money.component';

describe('SectionMoneyComponent', () => {
  let component: SectionMoneyComponent;
  let fixture: ComponentFixture<SectionMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
