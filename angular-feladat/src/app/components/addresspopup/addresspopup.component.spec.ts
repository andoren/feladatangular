import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddresspopupComponent } from './addresspopup.component';

describe('AddresspopupComponent', () => {
  let component: AddresspopupComponent;
  let fixture: ComponentFixture<AddresspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddresspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddresspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
