import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialViewComponent } from './special-view.component';

describe('SpecialViewComponent', () => {
  let component: SpecialViewComponent;
  let fixture: ComponentFixture<SpecialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
