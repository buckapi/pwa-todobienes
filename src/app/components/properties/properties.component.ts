import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { virtualRouter } from '../../services/virtualRouter.service';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  isGridView: boolean = true;

constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter
) {}
showGridView() {
  this.isGridView = true;
  }

  showListView() {
    this.isGridView = false;
  }
view(property:any){
  this.global.previewCard=property;
  this.global.setRoute('property-detail');
  
}

}
