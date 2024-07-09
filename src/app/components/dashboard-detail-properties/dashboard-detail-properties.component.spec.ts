import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetailPropertiesComponent } from './dashboard-detail-properties.component';

describe('DashboardDetailPropertiesComponent', () => {
  let component: DashboardDetailPropertiesComponent;
  let fixture: ComponentFixture<DashboardDetailPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDetailPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDetailPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
