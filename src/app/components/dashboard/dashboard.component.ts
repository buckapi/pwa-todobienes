import { CUSTOM_ELEMENTS_SCHEMA, Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { virtualRouter } from '../../services/virtualRouter.service';
import { HeaderDashboardComponent } from '../ui/header-dashboard/header-dashboard.component';
import { SidebarDashboardComponent } from '../ui/sidebar-dashboard/sidebar-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { DataApiService } from '../../services/data-api-service';
import { Yeoman } from '../../services/yeoman.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,
    HeaderDashboardComponent,
    SidebarDashboardComponent, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  isGridView: boolean = true;
  constructor(
    public global:GlobalService,
    public vitualRouter: virtualRouter,
    public dataApiService: DataApiService,
    public yeoman: Yeoman,
    public http: HttpClient,    
    private cdRef: ChangeDetectorRef


  ){}
  ngAfterViewInit(): void {
    this.loadInitialData();
    this.cdRef.detectChanges(); // Forzar la detección de cambios después de cargar los datos iniciales
  }

  loadInitialData(): void {
    console.log('Cargando datos iniciales...');
    this.global.previewCard = {
      id: "",
      region: "",
      municipality: [],
      code: "",
      title: "",
      address: "",
      status: "",
      description: "",
      typeProperty: "",
      bedrooms: "",
      livinromm: "",
      kitchen: "",
      bathroom: "",
      parking: "",
      stratum: "",
      area: "",
      canon: "",
      phone: "",
      images: []
    };
  }

  showGridView() {
    this.isGridView = true;
  }

  showListView() {
    this.isGridView = false;
  }

  view(property: any) {
    this.global.previewCard = property;
    this.global.setRoute('dashboard-detail-properties');
  }

  edit(property: any) {
    this.global.previewCard = property;
    this.global.setRoute('dashboard-edit-properties');
  }

  deleteProperty(property: any) {
    console.log('Intentando eliminar propiedad...');
    console.log('Preview Card:', this.global.previewCard);
    const propertyId = property.id;

    if (!propertyId) {
      console.error('No se puede eliminar la propiedad: ID no definido');
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se podrá revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataApiService.deleteProperty(propertyId).subscribe(
          response => {
            console.log('Propiedad eliminada:', response);
            this.global.loadProperties();
            Swal.fire(
              'Borrado!',
              'La propiedad ha sido eliminada.',
              'success'
            );
          },
          error => {
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar la propiedad. Inténtelo de nuevo más tarde.',
              'error'
            );
            console.error('Error al borrar la propiedad:', error);
          }
        );
      }
    });
  }
  cancelDelete(){}
}


