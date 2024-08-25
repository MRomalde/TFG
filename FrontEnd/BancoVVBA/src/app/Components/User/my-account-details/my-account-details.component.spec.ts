import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountDetailsComponent } from './my-account-details.component';

describe('MyAccountDetailsComponent', () => {
  let component: MyAccountDetailsComponent;
  let fixture: ComponentFixture<MyAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
