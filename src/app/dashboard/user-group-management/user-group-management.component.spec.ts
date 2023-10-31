import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupManagementComponent } from './user-group-management.component';

describe('UserGroupManagementComponent', () => {
  let component: UserGroupManagementComponent;
  let fixture: ComponentFixture<UserGroupManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserGroupManagementComponent]
    });
    fixture = TestBed.createComponent(UserGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
