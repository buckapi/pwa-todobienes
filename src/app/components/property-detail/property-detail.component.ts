import {
  AfterViewChecked,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { virtualRouter } from '../../services/virtualRouter.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import {
  AbstractControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SwiperEvents } from 'swiper/types';
import Swiper from 'swiper';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css',
})
export class PropertyDetailComponent implements OnInit {
  submitted: boolean = false;
  name: string = '';
  phone: string = '';
  email: string = '';
  share: FormGroup;
  constructor(
    public global: GlobalService,
    public virtualRouter: virtualRouter,
    public formBuilder: FormBuilder,
    private viewportScroller: ViewportScroller,
    public http: HttpClient
  ) {
    this.share = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
    this.loadPropertyDetails(this.global.previewCard.id);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.share.controls;
  }
  /* request() {
  const phoneNumber = '+573026047346';
  const message = `Propiedad de prueba "${this.global.previewCard.title}"`;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
  window.open(url, '_blank');
} */
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
 /*  shareOnWhatsApp() {
    const propertyLink = `https://todobienesgrupoinmobiliario.com/?id=${this.global.previewCard.id}`;
    const message =
      `¡Hola! Bienvenido a Todo Bienes Grupo Inmobiliario. Aquí tienes la información sobre una de nuestras propiedades:\n\n` +
      `**Título:** ${this.global.previewCard.title}\n` +
      `**Canon:** ${this.global.previewCard.canon}\n` +
      `**Descripción:** ${this.global.previewCard.description}\n\n` +
      `Para más detalles, visita el siguiente enlace: ${propertyLink}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone&text=${encodedMessage}`;
    window.open(url, '_blank');
  } */

  // Comparte en Facebook Messenger
  shareOnMessenger() {
    const propertyLink = `https://todobienesgrupoinmobiliario.com/?id=${this.global.previewCard.id}`;
    const message =
      `¡Hola! Bienvenido a Todo Bienes Grupo Inmobiliario. Aquí tienes la información sobre una de nuestras propiedades:\n\n` +
      `**Título:** ${this.global.previewCard.title}\n` +
      `**Canon:** ${this.global.previewCard.canon}\n` +
      `**Descripción:** ${this.global.previewCard.description}\n\n` +
      `Para más detalles, visita el siguiente enlace: ${propertyLink}`;
    // Facebook Messenger no soporta la precompone de mensajes a través de URLs
    const url = `https://www.messenger.com/t/?link=${encodeURIComponent(
      propertyLink
    )}`;
    window.open(url, '_blank');
  }

  shareOnWhatsApp() {
    const propertyLink = `https://todobienesgrupoinmobiliario.com/?id=${this.global.previewCard.id}`;
    const message = `¡Hola! Bienvenido a Todo Bienes Grupo Inmobiliario. Aquí tienes la información sobre una de nuestras propiedades:\n\n` +
                    `**Título:** ${this.global.previewCard.title}\n` +
                    `**Canon:** ${this.global.previewCard.canon}\n` +
                    `**Descripción:** ${this.global.previewCard.description}\n\n` +
                    `Para más detalles, visita el siguiente enlace: ${propertyLink}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(url, '_blank');
}

copyLink() {
    const propertyLink = `https://todobienesgrupoinmobiliario.com/?id=${this.global.previewCard.id}`;

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


  sendMessageToWhatsApp() {
    this.submitted = true;

    // Verifica si el formulario es válido antes de enviarlo
    if (this.share.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos antes de enviar la solicitud.',
      });
      return;
    }

    const formData = this.share.value;
    const phoneNumber = '+573015605187';
    const message = `Hola Todo Bienes, mis datos son:
  - Nombre: ${formData.name}
  - Email: ${formData.email}
  - Teléfono: ${formData.phone}
  Me gustaría reservar una visita para la propiedad "${this.global.previewCard.title}" 
  por un canon de ${this.global.previewCard.canon}`;

    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(url, '_blank');
  }

  ngOnInit(): void {
  window.scrollTo(0, 0); // Desplaza a la parte superior de la página
}
  /* ngAfterViewChecked(): void {
    window.scrollTo(0, 0);
  } */
}
