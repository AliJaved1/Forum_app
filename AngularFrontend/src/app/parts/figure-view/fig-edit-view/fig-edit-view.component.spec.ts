import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigEditViewComponent } from './fig-edit-view.component';

describe('FigEditViewComponent', () => {
  let component: FigEditViewComponent;
  let fixture: ComponentFixture<FigEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FigEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FigEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
