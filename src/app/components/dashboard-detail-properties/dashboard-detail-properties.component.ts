import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { DataApiService } from '../../services/data-api-service';
import { virtualRouter } from '../../services/virtualRouter.service';
import { CommonModule } from '@angular/common';
import { HeaderDashboardComponent } from '../ui/header-dashboard/header-dashboard.component';
import { SidebarDashboardComponent } from '../ui/sidebar-dashboard/sidebar-dashboard.component';
@Component({
  selector: 'app-dashboard-detail-properties',
  standalone: true,
  imports: [CommonModule, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-detail-properties.component.html',
  styleUrl: './dashboard-detail-properties.component.css'
})
export class DashboardDetailPropertiesComponent {
constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter
)
{}
}
