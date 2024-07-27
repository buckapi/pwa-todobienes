import { AfterViewChecked, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { virtualRouter } from '../../services/virtualRouter.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { SwiperEvents, } from 'swiper/types';
import Swiper from 'swiper';
@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements AfterViewChecked {
constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter,
  private viewportScroller: ViewportScroller
){}
ngOnInit(): void {
  window.scrollTo(0, 0); // Desplaza a la parte superior de la página
}
ngAfterViewChecked(): void {
  window.scrollTo(0, 0);
}

}
