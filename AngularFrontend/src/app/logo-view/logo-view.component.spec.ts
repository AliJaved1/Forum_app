import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoViewComponent } from './logo-view.component';

describe('LogoViewComponent', () => {
  let component: LogoViewComponent;
  let fixture: ComponentFixture<LogoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
