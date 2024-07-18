import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
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
    SidebarDashboardComponent, ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isGridView: boolean = true;
  constructor(
    public global:GlobalService,
    public vitualRouter: virtualRouter,
    public dataApiService: DataApiService,
    public yeoman: Yeoman,
    public http: HttpClient
  ){}
  
  showGridView() {
  this.isGridView = true;
  }

  showListView() {
    this.isGridView = false;
  }
  view(property:any){
    this.global.previewCard=property;
    this.global.setRoute('dashboard-detail-properties');
  }

  edit(property:any){
    this.global.previewCard=property;
    this.global.setRoute('dashboard-edit-properties');
  }

  beforeDelete() {
    Swal.fire({
      title: "¿Seguro deseas borrar esta propiedad?",
      text: "¡Esta acción no se podrá revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar!",
      cancelButtonText: "No, mejor no"
    }).then((result) => {
      if (result.value) {
        this.delete();  // Llamar al método delete para realizar la acción de borrado
        Swal.fire("Borrada!", "Propiedad borrada", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "", "error");
      }
    });
  }
 
  delete() {
  this.dataApiService.deleteProperty(this.global.previewCard.id).subscribe(
    response => {
      this.dataApiService.getAllProperties().subscribe(
        response => {
          this.yeoman.allProperties = response;
        },
        error => {
          console.error("Error al obtener todas las propiedades:", error);
        }
      );
    },
    error => {
      console.error("Error al borrar la propiedad:", error);
      Swal.fire("Error", "No se pudo borrar la propiedad. Inténtalo de nuevo más tarde.", "error");
    }
  );
} 

  
  deleteSelectedImages(){
    
  }
  cancelDelete(){}
    ngOnInit(): void {
    }
  
  }

