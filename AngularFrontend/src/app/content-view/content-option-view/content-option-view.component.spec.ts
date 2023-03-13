import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentOptionViewComponent } from './content-option-view.component';

describe('ContentOptionViewComponent', () => {
  let component: ContentOptionViewComponent;
  let fixture: ComponentFixture<ContentOptionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentOptionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentOptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
