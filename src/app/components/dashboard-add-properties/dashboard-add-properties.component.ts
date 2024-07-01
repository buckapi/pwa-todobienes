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

@Component({
  selector: 'app-dashboard-add-properties',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilePickerModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-add-properties.component.html',
  styleUrl: './dashboard-add-properties.component.css'
})
export class DashboardAddPropertiesComponent {
  addProperties: FormGroup;
  submitted = false;
  public isError = false;
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
    municipio: ['', Validators.required],
    codigo: ['', Validators.required],
    title: ['', Validators.required],
    direccion: ['', Validators.required],
    status: ['', Validators.required],
    descripcion: ['', Validators.required],
    typeProperty: ['', Validators.required],
    habitaciones: ['', Validators.required],
    sala: ['', Validators.required],
    cocina: ['', Validators.required],
    bathroom: ['', Validators.required],
    parqueadero: ['', Validators.required],
    estrato: ['', Validators.required],
    area: ['', Validators.required],
    canon: ['', Validators.required],
    telefono: ['', Validators.required],
    images: [null, Validators.required]
  });
}
get f(): { [key: string]: AbstractControl } {
  return this.addProperties.controls;
}


saveProperties() {
  this.submitted = true; 

  // Verifica si el formulario es válido antes de enviarlo
  /* if (this.addProperties.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.'
    });
    return;
  } */

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
        // Limpiar los valores para futuros usos
        this.global.properties = '';
        this.yeoman.allrequest.push(response);
        this.yeoman.allrequest = [...this.yeoman.allrequest];
        this.isError = false;
        
        // Reiniciar el formulario
        this.addProperties.reset();
        this.submitted = false;  // Resetear el estado de envío

        // Recargar la página
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
ngOnInit(): void {
  this.addProperties = this.formBuilder.group({
    municipio: ['', Validators.required],
    codigo: ['', Validators.required],
    title: ['', Validators.required],
    direccion: ['', Validators.required],
    status: ['', Validators.required],
    descripcion: ['', Validators.required],
    typeProperty: ['', Validators.required],
    habitaciones: ['', Validators.required],
    sala: ['', Validators.required],
    cocina: ['', Validators.required],
    bathroom: ['', Validators.required],
    parqueadero: ['', Validators.required],
    estrato: ['', Validators.required],
    area: ['', Validators.required],
    canon: ['', Validators.required],
    phone: ['', Validators.required],
    images: [null, Validators.required]
  });
}
onFileChange(event: any) {
  const reader = new FileReader();
  const file = event.target.files[0];

  if (file) {
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
    reader.readAsDataURL(file);
    this.addProperties.patchValue({
      identityDocument: file
    });
  }
}

onIsError(): void {
  this.isError = true;
  /* setTimeout(() => {
    this.isError = false;
  }, 4000); */
}
}
