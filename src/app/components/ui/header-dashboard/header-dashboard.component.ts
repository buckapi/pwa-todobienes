import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { virtualRouter } from '../../../services/virtualRouter.service';
import { PocketAuthService } from '../../../services/pocket-auth.service';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import PocketBase from 'pocketbase';
@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css'
})
export class HeaderDashboardComponent {
  ngFormLogin: FormGroup;
  submitted = false;
  public isError = false;
  returnUrl: any;
  public isLogged = false;
  message: any = 'Error en datos de acceso';
  ngFormRegister: FormGroup = new FormGroup({});
  errorMessage = '';
constructor (
  public global: GlobalService,
  public virtualRouter: virtualRouter,
  public pocketAuthService: PocketAuthService,
  public formBuilder: FormBuilder
){
  this.ngFormLogin = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
}
logout(): void {
  this.pocketAuthService.logoutUser();
}
ngOnInit(): void {
  this.ngFormLogin = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
 /*  this.ngFormRegister = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  }); */
  this.restoreSession();
}
restoreSession(): void {
  const isLoggedin = localStorage.getItem('isLoggedin');
  const currentUser = localStorage.getItem('currentUser');
  const userType = localStorage.getItem('type');

  if (isLoggedin && currentUser && userType) {
    const user = JSON.parse(currentUser);
    this.global.currentUser = user;

    switch (userType) {
      case 'admin':
        this.virtualRouter.routerActive = "dashboard";
        break;
      case 'cliente':
        this.fetchClientData(user.id);
        break;
      default:
        this.virtualRouter.routerActive = "user-home";
        break;
    }
  }
}
fetchClientData(userId: string): void {
  // Crear una instancia de PocketBase
  const pb = new PocketBase('https://db.buckapi.com:9095');

  // Hacer la solicitud para obtener los datos del cliente
  pb.collection('todobienesClients')
    .getList(1, 1, {
      userId: userId,
    })
    .then((resultList: any) => {
      // Verificar si hay resultados
      if (resultList.items && resultList.items.length > 0) {
        const record = resultList.items[0]; // Tomar el primer registro
        console.log('Datos del cliente:', JSON.stringify(record));
        localStorage.setItem('status', record.status);
        // Redirigir al usuario al home del clienteuser
        this.virtualRouter.routerActive = 'dashboard';
      } else {
        console.error('No se encontraron registros para el usuario:', userId);
        // Redirigir al usuario al home
        this.virtualRouter.routerActive = 'bashboard';
      }
    })
    .catch((error) => {
      // Manejar errores de la solicitud al API aquí
      console.error('Error al obtener datos del cliente:', error);
      // Redirigir al usuario al home
      this.virtualRouter.routerActive = 'user-home';
    });
}
}
