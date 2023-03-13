import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionViewComponent } from './user-action-view.component';

describe('UserActionViewComponent', () => {
  let component: UserActionViewComponent;
  let fixture: ComponentFixture<UserActionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
