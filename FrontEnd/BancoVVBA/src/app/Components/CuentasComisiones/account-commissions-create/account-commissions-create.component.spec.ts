import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCommissionsCreateComponent } from './account-commissions-create.component';

describe('AccountCommissionsCreateComponent', () => {
  let component: AccountCommissionsCreateComponent;
  let fixture: ComponentFixture<AccountCommissionsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCommissionsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCommissionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
