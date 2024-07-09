import { Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { DataApiService } from '../../services/data-api-service';
import { virtualRouter } from '../../services/virtualRouter.service';

@Component({
  selector: 'app-dashboard-detail-properties',
  standalone: true,
  imports: [],
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
