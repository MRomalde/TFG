import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountCreateOperComponent } from './my-account-create-oper.component';

describe('MyAccountCreateOperComponent', () => {
  let component: MyAccountCreateOperComponent;
  let fixture: ComponentFixture<MyAccountCreateOperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAccountCreateOperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountCreateOperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
