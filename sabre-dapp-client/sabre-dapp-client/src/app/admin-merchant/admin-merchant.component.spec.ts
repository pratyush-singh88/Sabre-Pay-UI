import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMerchantComponent } from './admin-merchant.component';

describe('AdminMerchantComponent', () => {
  let component: AdminMerchantComponent;
  let fixture: ComponentFixture<AdminMerchantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMerchantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
