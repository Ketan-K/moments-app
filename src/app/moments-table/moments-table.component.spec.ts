import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentsTableComponent } from './moments-table.component';

describe('MomentsTableComponent', () => {
  let component: MomentsTableComponent;
  let fixture: ComponentFixture<MomentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomentsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
