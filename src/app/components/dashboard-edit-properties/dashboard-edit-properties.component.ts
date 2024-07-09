import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { virtualRouter } from '../../services/virtualRouter.service';
import { HttpClient } from '@angular/common/http';
import { Butler } from '../../services/butler.service';
import { FormGroup, Validators } from '@angular/forms';
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
  imports: [CommonModule, ReactiveFormsModule, FilePickerModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard-edit-properties.component.html',
  styleUrl: './dashboard-edit-properties.component.css'
})
export class DashboardEditPropertiesComponent {
  submitted = false;
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
    id: "",
    municipio: "",
  codigo: "",
  title: "",
  direccion: "",
  status: "",
  descripcion: "",
  typeProperty: "",
  habitaciones: "",
  sala: "",
  cocina: "",
  bathroom: "",
  parqueadero: "",
  estrato: "",
  area: "",
  canon: "",
  phone: "",
  images: []
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
  
}

  updateProperties() {
/*     this.data.images=
 */      this._butler.uploaderImages.length > 0
        ? this._butler.uploaderImages
        : this.global.previewCard.images;

    this.dataApiService
      .propertiesUpdate(this.data, this.global.previewCard.id)
      .subscribe((response) => {
        console.log(response);
        this.global.loadProperties();
        this.global.editingProperties = false;
        this.virtualRouter.routerActive = "dashboard";
        this.data = {
          id:"",
          municipio: "",
          codigo: "",
          title: "",
          direccion: "",
          status: "",
          descripcion: "",
          typeProperty: "",
          habitaciones: "",
          sala: "",
          cocina: "",
          bathroom: "",
          parqueadero: "",
          estrato: "",
          area: "",
          canon: "",
          phone: "",
          images: []
  };

        this._butler.uploaderImages = [];
        (this.global.addingProduct = false),
          (this.global.editingProperties = false),
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Autoparte Actualizada",
            showConfirmButton: false,
            timer: 1500,
          });
      });
  }
}
