import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { virtualRouter } from '../../services/virtualRouter.service';
import { DataApiService } from '../../services/data-api-service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  addmessage: FormGroup;
  submitted: boolean = false;
  public isError = false;
constructor (
  public global: GlobalService,
  public virtualRoter: virtualRouter,
  public dataApiService: DataApiService,
  public formBuilder: FormBuilder,
  public http: HttpClient
){
  this.addmessage = this.formBuilder.group({
    name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(\+57|57)?[ -]*(3)[ -]*([0-9][ -]*){9}$/)]], // Regex para validar el número de teléfono colombiano
email: ['', [Validators.required, Validators.email]],
    typeProperty: ['', Validators.required],
    message: ['', Validators.required],
  });
}
get f(): { [key: string]: AbstractControl } {
  return this.addmessage.controls;
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
ngOnInit(): void {
   this.addmessage = this.formBuilder.group({
    name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(\+57|57)?[ -]*(3)[ -]*([0-9][ -]*){9}$/)]], // Regex para validar el número de teléfono colombiano
    email: ['', [Validators.required, Validators.email]],
    typeProperty: ['', Validators.required],
    message: ['', Validators.required],
  });
}
onIsError(): void {
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
  }, 4000);
}
}
