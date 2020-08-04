import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumpageComponent } from './sumpage.component';

describe('SumpageComponent', () => {
  let component: SumpageComponent;
  let fixture: ComponentFixture<SumpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
