import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { virtualRouter } from '../../../services/virtualRouter.service';
import { PocketAuthService } from '../../../services/pocket-auth.service';

@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.css'
})
export class SidebarDashboardComponent {
constructor(
  public global:GlobalService,
  public virtualRouter:virtualRouter,
  public pocketAuthService: PocketAuthService
)
{}
logout(): void {
  this.pocketAuthService.logoutUser();
}
}
