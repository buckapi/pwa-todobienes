import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { virtualRouter } from '../../../services/virtualRouter.service';
import { PocketAuthService } from '../../../services/pocket-auth.service';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css'
})
export class HeaderDashboardComponent {
constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter,
  public pocketAuthService: PocketAuthService
){}
logout(): void {
  this.pocketAuthService.logoutUser();
}

}
