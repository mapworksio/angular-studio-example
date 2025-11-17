import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWidget } from './custom-widget';

describe('CustomWidget', () => {
  let component: CustomWidget;
  let fixture: ComponentFixture<CustomWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
