import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonauthproductsComponent } from './nonauthproducts.component';

describe('NonauthproductsComponent', () => {
  let component: NonauthproductsComponent;
  let fixture: ComponentFixture<NonauthproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonauthproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonauthproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
