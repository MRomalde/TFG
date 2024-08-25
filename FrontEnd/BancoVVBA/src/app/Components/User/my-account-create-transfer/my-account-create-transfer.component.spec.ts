import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountCreateTransferComponent } from './my-account-create-transfer.component';

describe('MyAccountCreateTransferComponent', () => {
  let component: MyAccountCreateTransferComponent;
  let fixture: ComponentFixture<MyAccountCreateTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountCreateTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountCreateTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
