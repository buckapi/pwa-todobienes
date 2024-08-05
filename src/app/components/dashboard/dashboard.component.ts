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
  imports: [CommonModule,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements AfterViewInit {
  isGridView: boolean = true;
  propertiesCount: number = 0;
  rentedPropertiesCount: number = 0;
  soldPropertiesCount: number = 0;
  messagesCount: number = 0;
  constructor(
    public global:GlobalService,
    public vitualRouter: virtualRouter,
    public dataApiService: DataApiService,
    public yeoman: Yeoman,
    public http: HttpClient,    
    private cdRef: ChangeDetectorRef


  ){
    this.loadPropertyDetails(this.global.previewCard.id);
  }
  ngAfterViewInit(): void {
    this.loadInitialData();
    this.cdRef.detectChanges(); // Forzar la detección de cambios después de cargar los datos iniciales
    this.global.getPropertiesCount().subscribe(count => this.propertiesCount = count);
    this.global.getRentedPropertiesCount().subscribe(count => this.rentedPropertiesCount = count);
    this.global.getSoldPropertiesCount().subscribe(count => this.soldPropertiesCount = count);
    this.global.getMessagesCount().subscribe(count => this.messagesCount = count);

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
  loadPropertyDetails(id: string) {
    const endpoint = `https://db.buckapi.com:8090/api/collections/tdProperties/records/${id}`;
    this.http.get(endpoint).subscribe(
      (data: any) => {
        this.global.previewCard.title = data.title;
        this.global.previewCard.canon = data.canon;
/*         this.global.previewCard.images = JSON.parse(data.images); // Asume que 'images' es un JSON de URLs
 */      },
      (error) => {
        console.error('Error al cargar los detalles de la propiedad:', error);
      }
    );
  }
  // Comparte en WhatsApp
  shareOnWhatsApp() {
    const propertyLink = `https://todobienesgrupoinmobiliario.com/property-detail/${this.global.previewCard.id}`;
    const message = `¡Hola! Bienvenido a Todo Bienes Grupo Inmobiliario. Aquí tienes la información sobre una de nuestras propiedades:\n\n` +
                    `**Título:** ${this.global.previewCard.title}\n` +
                    `**Canon:** ${this.global.previewCard.canon}\n` +
                    `**Descripción:** ${this.global.previewCard.description}\n\n` +
                    `Para más detalles, visita el siguiente enlace: ${propertyLink}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=+573015605187&text=${encodedMessage}`;
    window.open(url, '_blank');
  }
  

  // Comparte en Facebook Messenger
  shareOnMessenger() {
    const propertyLink = `https://todobienesgrupoinmobiliario.com/property-detail/${this.global.previewCard.id}`;
    const message = `¡Hola! Bienvenido a Todo Bienes Grupo Inmobiliario. Aquí tienes la información sobre una de nuestras propiedades:\n\n` +
                    `**Título:** ${this.global.previewCard.title}\n` +
                    `**Canon:** ${this.global.previewCard.canon}\n` +
                    `**Descripción:** ${this.global.previewCard.description}\n\n` +
                    `Para más detalles, visita el siguiente enlace: ${propertyLink}`;
    // Facebook Messenger no soporta la precompone de mensajes a través de URLs
    const url = `https://www.messenger.com/t/?link=${encodeURIComponent(propertyLink)}`;
    window.open(url, '_blank');
  }
  

  // Copia el enlace al portapapeles
  copyLink() {
    const propertyLink = `https://todobienesgrupoinmobiliario.com/${this.global.previewCard.id}`;
    
    // Crea un elemento de input para usarlo como intermediario
    const tempInput = document.createElement('input');
    tempInput.value = propertyLink;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    
    // Opcional: Mostrar un mensaje de confirmación al usuario
    alert('Enlace copiado al portapapeles!');
  }
}


