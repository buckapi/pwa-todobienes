import { Component, OnInit} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { Yeoman } from '../../services/yeoman.service';
import { DataApiService } from '../../services/data-api-service';
import { FormBuilder, AbstractControl, FormControlDirective, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { virtualRouter } from '../../services/virtualRouter.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  submitted = false;
  public isError = false;
  propertys:any;
  addmessage: FormGroup;
  regiones: string[] = [
    "Bajo Cauca", "Magdalena Medio", "Nordeste", "Norte",
    "Occidente", "Oriente", "Suroeste", "Urabá", "Valle de Aburrá"
  ];

  municipios: string[] = [];
constructor(
  public global:GlobalService,
  public yeoman: Yeoman,
  public dataApiService: DataApiService,
  private formBuilder: FormBuilder,
  public virtualRouter: virtualRouter

){
  this.addmessage = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^(\+57|57)?[ -]*(3)[ -]*([0-9][ -]*){9}$/)]], // Regex para validar el número de teléfono colombiano
    email: ['', [Validators.required, Validators.email]],
    typeProperty: ['', Validators.required],
    message: ['', Validators.required],
  });
}
/* searchProperties(event: Event) {
  this.global.searchProperties(event);
} */
get f(): { [key: string]: AbstractControl } {
  return this.addmessage.controls;
}
view(property:any){
  this.global.previewCard=property;
  this.global.setRoute('property-detail');
  
}
viewProperty(propertyId: string): void {
  this.global.virtuallRouter.navigate('property-detail', propertyId);
}

sendmessage(): void {
  this.submitted = true;

  if (this.addmessage.invalid) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.'
    });
    return;
  }

  let data: any = this.addmessage.value;
  this.dataApiService.sendmessage(data).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Solicitud guardada correctamente.'
      }).then(() => {
        this.addmessage.reset();
        this.submitted = false;
        window.location.reload();
      });

      console.log('Solicitud guardada correctamente:', response);
    },
    (error) => {
      this.isError = true;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al guardar la solicitud. Por favor, inténtelo de nuevo más tarde.'
      });
      console.log('Error al guardar la solicitud:', error);
    }
  );
}
selectTypeProperty(type: string) {
  this.global.selectTypeProperty(type);
}

/* selectMunicipality(event: Event): void {
  const target = event.target as HTMLSelectElement;
  const municipality = target.value;
  this.global.selectMunicipality([municipality]);
} */

searchProperties(event: Event): void {
  this.global.searchProperties(event);
}

selectStatus(status: string): void {
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
  this.addmessage = this.formBuilder.group({
   name: ['', Validators.required],
   phone: ['', [Validators.required, Validators.pattern(/^(\+57|57)?[ -]*(3)[ -]*([0-9][ -]*){9}$/)]], // Regex para validar el número de teléfono colombiano
  email: ['', [Validators.required, Validators.email]],
  typeProperty: ['', Validators.required],
  message: ['', Validators.required],
 });
 this.global.initializeFilters();
 this.global.loadPropertyTypesAndMunicipalities(); // Cargar tipos de propiedad y municipios al inicializar
 this.global.loadProperties();
 this.global.loadPropertyTypesAndMunicipalities();


}
navigateToProperties(): void {
  this.global.initializeFilters(); // Inicializar los filtros antes de navegar
  this.global.setRoute('properties');
}
onIsError(): void {
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}

}
