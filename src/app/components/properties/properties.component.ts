import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { virtualRouter } from '../../services/virtualRouter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  isGridView: boolean = true;
  municipios: string[] = [];
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


selectTypeProperty(type: string) {
  this.global.selectTypeProperty(type);
}

selectMunicipality(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const municipality = target.value;
  this.global.selectedMunicipality = [municipality];  // Reemplaza el array con un solo municipio

}

searchProperties(event: Event): void {
  event.preventDefault(); // Prevent the default form submit action
  this.global.applyFilters();
}

selectStatus(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const status = target.value;
  this.global.selectStatus(status);
}

resetFilters(): void {
  this.global.searchQuery = '';
  this.global.selectedTypeProperty = '';
  this.global.selectedMunicipality = [];
  this.global.selectedStatus = '';
  this.global.loadProperties(); // Recargar propiedades sin filtros
}

ngOnInit(): void {
  this.global.initializeFilters();
  this.global.loadPropertyTypesAndMunicipalities(); // Cargar tipos de propiedad y municipios al inicializar
  this.global.loadProperties();
}

}
