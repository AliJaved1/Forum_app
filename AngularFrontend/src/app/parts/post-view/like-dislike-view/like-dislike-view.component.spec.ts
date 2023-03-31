import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeDislikeViewComponent } from './like-dislike-view.component';

describe('LikeDislikeViewComponent', () => {
  let component: LikeDislikeViewComponent;
  let fixture: ComponentFixture<LikeDislikeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikeDislikeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeDislikeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
