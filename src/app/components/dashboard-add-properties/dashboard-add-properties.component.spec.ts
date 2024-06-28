import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddPropertiesComponent } from './dashboard-add-properties.component';

describe('DashboardAddPropertiesComponent', () => {
  let component: DashboardAddPropertiesComponent;
  let fixture: ComponentFixture<DashboardAddPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAddPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
