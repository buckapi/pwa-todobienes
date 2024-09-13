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
import { HeaderDashboardComponent } from '../ui/header-dashboard/header-dashboard.component';
import { SidebarDashboardComponent } from '../ui/sidebar-dashboard/sidebar-dashboard.component';

@Component({
  selector: 'app-dashboard-edit-properties',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FilePickerModule, FormsModule, ],
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
    images: [] as string[] // Asegúrate de que este tipo sea compatible
  };
  properties: any[] = [];


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
 
      update() {
      let currentImages = this.global.previewCard.images;
    this.global.previewCard.images = currentImages;
    if (this._butler.uploaderImages.length > 0) {
      this.data.images.push(...this._butler.uploaderImages);
      this._butler.uploaderImages = [];
    }

    this.dataApiService.updateProperties(this.global.previewCard, this.global.previewCard.id)
      .subscribe(
        (response) => {
          console.log(response);
          this.global.loadProperties();
          this.global.editingProperties = false;
          this.global.setRoute('dashboard');
          this.global.previewCard = {
            id: "",
            region:"",
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
            asesor: "",
            images: []
          };
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Propiedad actualizada",
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al actualizar la propiedad. Inténtelo de nuevo más tarde."
          });
          console.error("Error al actualizar la propiedad:", error);
        }
      );
  }

  


 
toggleDeleteButton(index: number, isVisible: boolean) {
  this.showDeleteButton[index] = isVisible;
}

delete(indice:any){
this.global.previewCard.images.splice(indice);
Swal.fire({
position: 'center',
icon: 'success',
title: 'borrado',
showConfirmButton: false,
timer: 1500

});

} 
 
}

