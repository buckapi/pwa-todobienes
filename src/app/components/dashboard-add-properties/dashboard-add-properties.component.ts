import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { virtualRouter } from '../../services/virtualRouter.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Butler } from '../../services/butler.service';
import { DataApiService } from '../../services/data-api-service';
import { Yeoman } from '../../services/yeoman.service';
import { FilePickerModule, UploaderCaptions } from 'ngx-awesome-uploader';
import Swal from 'sweetalert2';
import { CustomFilePickerAdapter } from '../../file-picker.adapter'; 
import { ActivatedRouteSnapshot } from '@angular/router';
import { RegionesYMunicipios } from '../../interface/regiones-municipios';
import { HeaderDashboardComponent } from '../ui/header-dashboard/header-dashboard.component';
import { SidebarDashboardComponent } from '../ui/sidebar-dashboard/sidebar-dashboard.component';
@Component({
  selector: 'app-dashboard-add-properties',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilePickerModule, SidebarDashboardComponent, HeaderDashboardComponent ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-add-properties.component.html',
  styleUrl: './dashboard-add-properties.component.css'
})
export class DashboardAddPropertiesComponent {
  addProperties: FormGroup;
  submitted: boolean = false;
  uploadedImages: string[] = [];
  public isError = false;
  showDeleteButton: boolean[] = [];
  uploadedImage: string | ArrayBuffer | null = null;
  adapter = new CustomFilePickerAdapter(this.http, this._butler, this.global);
  imgResult: string = '';
  imgResultAfterCompression: string = '';
  imgResultBeforeCompression: string = '';
  public captions: UploaderCaptions = {
    dropzone: {
      title: '10 MB máx.',
      or: '.',
      browse: 'Subir documento',
    },
    cropper: {
      crop: 'Cortar',
      cancel: 'Cancelar',
    },
    previewCard: {
      remove: 'Borrar',
      uploadError: 'error',
    },
  };
  regiones: (keyof RegionesYMunicipios)[] = [
    "Bajo Cauca", "Magdalena Medio", "Nordeste", "Norte",
    "Occidente", "Oriente", "Suroeste", "Urabá", "Valle de Aburrá"
  ];

  regionesYMunicipios: RegionesYMunicipios = {
    "Bajo Cauca": ["Cáceres", "Caucasia", "El Bagre", "Nechí", "Tarazá", "Zaragoza"],
    "Magdalena Medio": ["Caracolí", "Maceo", "Puerto Berrío", "Puerto Nare", "Puerto Triunfo", "Yondó"],
    "Nordeste": ["Amalfi", "Anorí", "Cisneros", "Remedios", "San Roque", "Santo Domingo", "Segovia", "Vegachí", "Yolombó"],
    "Norte": ["Angostura", "Belmira", "Briceño", "Campamento", "Carolina del Príncipe", "Don Matías", "Entrerríos", "Gómez Plata", "Guadalupe", "Ituango", "San Andrés de Cuerquía", "San José de la Montaña", "San Pedro de los Milagros", "Santa Rosa de Osos", "Toledo", "Valdivia", "Yarumal"],
    "Occidente": ["Abriaquí", "Anzá", "Armenia", "Buriticá", "Cañasgordas", "Caicedo", "Dabeiba", "Ebéjico", "Frontino", "Giraldo", "Heliconia", "Liborina", "Olaya", "Peque", "Sabanalarga", "San Jerónimo", "Santa Fe de Antioquia", "Sopetrán", "Uramita"],
    "Oriente": ["Abejorral", "Alejandría", "Argelia", "El Carmen de Viboral", "El Peñol", "El Retiro", "Granada", "Guarne", "La Ceja", "La Unión", "Marinilla", "Nariño", "Rionegro", "San Carlos", "San Francisco", "San Luis", "San Rafael", "San Vicente Ferrer"],
    "Suroeste": ["Amagá", "Andes", "Angelópolis", "Betania", "Betulia", "Caramanta", "Ciudad Bolívar", "Concordia", "Fredonia", "Hispania", "Jardín", "Jericó", "La Pintada", "Montebello", "Pueblorrico", "Salgar", "Santa Bárbara", "Támesis", "Tarso", "Titiribí", "Urrao", "Valparaíso", "Venecia"],
    "Urabá": ["Apartadó", "Arboletes", "Carepa", "Chigorodó", "Murindó", "Mutatá", "Necoclí", "San Juan de Urabá", "Turbo", "Vigía del Fuerte"],
    "Valle de Aburrá": ["Barbosa", "Bello", "Caldas", "Copacabana", "Envigado", "Girardota", "Itagüí", "La Estrella", "Medellín", "Sabaneta"]
  };

  municipios: string[] = [];
constructor(
  public global: GlobalService,
  public virtualRouter: virtualRouter,
  public http: HttpClient,
  public _butler: Butler,
  public formBuilder: FormBuilder,
  public dataApiService: DataApiService,
  public yeoman: Yeoman
){
  this.addProperties = this.formBuilder.group({
    municipality: ['', Validators.required],
    code: ['', Validators.required],
    title: ['', Validators.required],
    address: ['', Validators.required],
    status: ['', Validators.required],
    description: ['', Validators.required],
    typeProperty: ['', Validators.required],
    bedrooms: ['', Validators.required],
    livinromm: ['', Validators.required],
    kitchen: ['', Validators.required],
    bathroom: ['', Validators.required],
    parking: ['', Validators.required],
    stratum: ['', Validators.required],
    area: ['', Validators.required],
    canon: ['', Validators.required],
    phone: ['', Validators.required],
    images: [null, Validators.required]
    
  });
}
get f(): { [key: string]: AbstractControl } {
  return this.addProperties.controls;
}



saveProperties(): void {
  this.submitted = true;

 /*  if (this.addProperties.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.'
    });
    return;
  }
 */
  let data: any = this.addProperties.value;
  data.images = this._butler.uploaderImages;
  this._butler.uploaderImages = [];

  this.dataApiService.saveProperties(data).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Solicitud guardada correctamente.'
      }).then(() => {
        this.global.properties = '';
        this.global.allProperties.push(response);
        this.global.allProperties = [...this.global.allProperties];
        this.isError = false;
        this.addProperties.reset();
        this.submitted = false;
        window.location.reload();
      });

      console.log('Solicitud guardada correctamente:', response);
    },
    (error) => {
      this.onIsError();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al guardar la solicitud. Por favor, inténtelo de nuevo más tarde.'
      });
      console.log('Error al guardar la solicitud:', error);
    }
  );
}
onFileChange(event: any): void {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    const file = files[i];

    if (file) {
      reader.onload = () => {
        this.uploadedImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Actualiza el formulario o maneja el archivo según sea necesario
      this.addProperties.patchValue({
        identityDocument: file
      });
    }
  }
}

deleteImage(index: number): void {
  this.uploadedImages.splice(index, 1);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Imagen borrada',
    showConfirmButton: false,
    timer: 1500
  });
}
onRegionChange(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const region = target.value as keyof RegionesYMunicipios;
  this.municipios = this.regionesYMunicipios[region] || [];
  this.addProperties.get('municipality')?.setValue('');  // Reset the municipality selection
}


ngOnInit(): void {
  this.addProperties = this.formBuilder.group({
    region: ['', Validators.required],
    municipality: ['', Validators.required],
    code: ['', Validators.required],
    title: ['', Validators.required],
    address: ['', Validators.required],
    status: ['', Validators.required],
    description: ['', Validators.required],
    typeProperty: ['', Validators.required],
    bedrooms: ['', Validators.required],
    livinromm: ['', Validators.required],
    kitchen: ['', Validators.required],
    bathroom: ['', Validators.required],
    parking: ['', Validators.required],
    stratum: ['', Validators.required],
    area: ['', Validators.required],
    canon: ['', Validators.required],
    phone: ['', Validators.required],
    images: [null, Validators.required]
  });
}
  
onIsError(): void {
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}
}
