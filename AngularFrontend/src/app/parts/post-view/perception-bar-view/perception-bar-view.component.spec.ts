import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerceptionBarViewComponent } from './perception-bar-view.component';

describe('PerceptionBarViewComponent', () => {
  let component: PerceptionBarViewComponent;
  let fixture: ComponentFixture<PerceptionBarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerceptionBarViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerceptionBarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
