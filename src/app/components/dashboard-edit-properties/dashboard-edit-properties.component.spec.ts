import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEditPropertiesComponent } from './dashboard-edit-properties.component';

describe('DashboardEditPropertiesComponent', () => {
  let component: DashboardEditPropertiesComponent;
  let fixture: ComponentFixture<DashboardEditPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEditPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardEditPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
