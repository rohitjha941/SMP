import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorsDetailsComponent } from './mentors-details.component';

describe('MentorsDetailsComponent', () => {
  let component: MentorsDetailsComponent;
  let fixture: ComponentFixture<MentorsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentorsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
