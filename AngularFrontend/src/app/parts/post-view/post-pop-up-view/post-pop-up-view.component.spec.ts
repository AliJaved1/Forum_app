import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPopUpViewComponent } from './post-pop-up-view.component';

describe('PostPopUpViewComponent', () => {
  let component: PostPopUpViewComponent;
  let fixture: ComponentFixture<PostPopUpViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPopUpViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostPopUpViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
