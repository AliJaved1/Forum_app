import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModProfileViewComponent } from './mod-profile-view.component';

describe('ModProfileViewComponent', () => {
  let component: ModProfileViewComponent;
  let fixture: ComponentFixture<ModProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModProfileViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
