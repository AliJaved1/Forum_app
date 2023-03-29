import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FigureViewComponent } from './figure-view.component';

describe('FigureViewComponent', () => {
  let component: FigureViewComponent;
  let fixture: ComponentFixture<FigureViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FigureViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FigureViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
