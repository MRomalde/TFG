import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCommissionsComponent } from './account-commissions.component';

describe('AccountCommissionsComponent', () => {
  let component: AccountCommissionsComponent;
  let fixture: ComponentFixture<AccountCommissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCommissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
