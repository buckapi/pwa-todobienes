import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { virtualRouter } from '../../services/virtualRouter.service';
import { HttpClient } from '@angular/common/http';
import { Butler } from '../../services/butler.service';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { AbstractControl,FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataApiService } from '../../services/data-api-service';
import { Yeoman } from '../../services/yeoman.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FilePickerModule, UploaderCaptions } from 'ngx-awesome-uploader';
import { CustomFilePickerAdapter } from '../../file-picker.adapter'; 


@Component({
  selector: 'app-dashboard-edit-properties',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilePickerModule, FormsModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-edit-properties.component.html',
  styleUrl: './dashboard-edit-properties.component.css'
})
export class DashboardEditPropertiesComponent {
  showDeleteButton: boolean[] = [];
  editProperties!: FormGroup;
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
  data = {
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
  };

constructor(
  public global: GlobalService,
  public virtualRouter: virtualRouter,
  public http: HttpClient,
  public _butler: Butler,
  private formBuilder: FormBuilder,
  public dataApiService: DataApiService,
  public yeoman: Yeoman
){
  
}
cancelarUpdate() {
    this.global.editingProperties = false;
    this._butler.uploaderImages = [];
    this.global.setRoute('dashboard');

  }
toggleDeleteButton(index: number, isVisible: boolean) {
  this.showDeleteButton[index] = isVisible;
}
delete(indice:any){
  this.yeoman.preview.images.splice(indice);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'borrado',
    showConfirmButton: false,
    timer: 1500
    
  });
  
  }
  onSubmit() {
    this.submitted = true;
  
    // Verifica si el formulario es válido antes de enviarlo
   /*  if (this.editProperties.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.'
      });
      return;
    } */
  
    const formData = this.editProperties.value;
    formData.images = this._butler.uploaderImages.length > 0 ? this._butler.uploaderImages : this.global.previewCard.images;
  
    this.dataApiService.updateProperties(formData, this.global.previewCard.id).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Propiedad actualizada correctamente.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Actualiza la vista previa de la tarjeta global con los nuevos datos
          this.global.previewCard = { ...this.global.previewCard, ...formData };
  
          // Limpiar imágenes subidas
          this._butler.uploaderImages = [];
          this.submitted = false;  // Resetear el estado de envío
  
          // Redirigir al dashboard
          this.global.setRoute('dashboard');
        });
  
        console.log('Propiedad actualizada correctamente:', response);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al actualizar la propiedad. Por favor, inténtelo de nuevo más tarde.'
        });
        console.log('Error al actualizar la propiedad:', error);
      }
    );
  
    console.log('Form data submitted:', formData);
  }
 
  /* onFileChange(event: any) {
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
  } */
}
