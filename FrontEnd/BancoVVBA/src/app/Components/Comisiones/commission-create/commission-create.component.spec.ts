import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionCreateComponent } from './commission-create.component';

describe('CommissionCreateComponent', () => {
  let component: CommissionCreateComponent;
  let fixture: ComponentFixture<CommissionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
