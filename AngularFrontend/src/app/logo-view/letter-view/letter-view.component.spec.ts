import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterViewComponent } from './letter-view.component';

describe('LetterViewComponent', () => {
  let component: LetterViewComponent;
  let fixture: ComponentFixture<LetterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LetterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LetterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
