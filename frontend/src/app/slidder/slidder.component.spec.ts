import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidderComponent } from './slidder.component';

describe('SlidderComponent', () => {
  let component: SlidderComponent;
  let fixture: ComponentFixture<SlidderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
