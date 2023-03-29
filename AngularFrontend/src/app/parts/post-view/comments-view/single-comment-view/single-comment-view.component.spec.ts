import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCommentViewComponent } from './single-comment-view.component';

describe('SingleCommentViewComponent', () => {
  let component: SingleCommentViewComponent;
  let fixture: ComponentFixture<SingleCommentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCommentViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCommentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
