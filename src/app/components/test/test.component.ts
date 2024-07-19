import { Component } from '@angular/core';
import { SidebarDashboardComponent } from '../ui/sidebar-dashboard/sidebar-dashboard.component';
import { CommonModule } from '@angular/common';
import { HeaderDashboardComponent } from '../ui/header-dashboard/header-dashboard.component';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    SidebarDashboardComponent,
    HeaderDashboardComponent,
    CommonModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

}
