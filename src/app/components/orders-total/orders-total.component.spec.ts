import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTotalComponent } from './orders-total.component';

describe('OrdersTotalComponent', () => {
  let component: OrdersTotalComponent;
  let fixture: ComponentFixture<OrdersTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
