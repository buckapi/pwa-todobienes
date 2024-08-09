import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class virtualRouter {
  routerActive: string = 'home';
  activeId: string | null = null;

  navigate(route: string, id?: string): void {
    this.routerActive = route;
    this.activeId = id || null;
    console.log('Ruta activa:', this.routerActive);
    console.log('ID activo:', this.activeId);
  }

  getRoute(): string {
    return this.routerActive;
  }

  getId(): string | null {
    return this.activeId;
  }
}
