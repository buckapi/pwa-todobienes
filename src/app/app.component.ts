import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from './services/global.service';
import { CommonModule } from '@angular/common';
import { ScriptService } from './services/script.service';
import { MapwrapperComponent } from './components/mapwrapper/mapwrapper.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { virtualRouter } from './services/virtualRouter.service';
import { TestComponent } from './components/test/test.component';
import { HeaderDashboardComponent } from './components/ui/header-dashboard/header-dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { ServDetailComponent } from './components/serv-detail/serv-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { ServiceComponent } from './components/service/service.component';
import { AgentsComponent } from './components/agents/agents.component';
import { PropertiesComponent } from './components/properties/properties.component';
import { PropertyDetailComponent } from './components/property-detail/property-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthRESTService } from './services/auth-rest.service';
import { PocketAuthService } from './services/pocket-auth.service';
import { FormBuilder, ReactiveFormsModule, AbstractControl,  FormGroup, Validators, FormsModule,  } from '@angular/forms';
import PocketBase from 'pocketbase';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardAddPropertiesComponent } from './components/dashboard-add-properties/dashboard-add-properties.component';
import { DashboardDetailPropertiesComponent } from './components/dashboard-detail-properties/dashboard-detail-properties.component';
import { DashboardEditPropertiesComponent } from './components/dashboard-edit-properties/dashboard-edit-properties.component';
import Swiper from 'swiper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MapwrapperComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    
    TestComponent,
    HeaderDashboardComponent,
    AboutComponent,
    ServDetailComponent,
    BlogComponent,
    FaqComponent,
    ContactComponent,
    ServiceComponent,
    AgentsComponent,
    PropertiesComponent,
    PropertyDetailComponent,
    DashboardComponent,
    HeaderDashboardComponent,
    ReactiveFormsModule,
    FormsModule,
    DashboardAddPropertiesComponent,
    DashboardDetailPropertiesComponent,
    DashboardEditPropertiesComponent,
    
  
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'camiwa';
  ngFormLogin: FormGroup;
  submitted = false;
  public isError = false;
  returnUrl: any;
  public isLogged = false;
  message: any = 'Error en datos de acceso';
  ngFormRegister: FormGroup = new FormGroup({});
  errorMessage = '';
  constructor(
    private renderer: Renderer2,
    public global: GlobalService,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public autRest: AuthRESTService,
    public pocketAuthService: PocketAuthService, 
    public formBuilder: FormBuilder,

  ) {
    this.ngFormLogin = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.script
      .load(
        'jquery',
        'jqueryEasing',
        'jqueryNiceSelect',
        'bootstrap',
        'swiperBundle',
        'owl',
        'swiper',
        'jqueryValidate',
        'countto',
        'plugin',
         'shortcodes',
         'main',
        'curved',
        'priceRanger',
/*         'apexcharts',
 */        'jqueryCookie',
        'dashboardMenuMin',
        'dashboardMenu'
      )
      .then(() => {
        console.log('Todos los scripts se cargaron correctamente');
      })
      .catch((error) => console.log(error));
    // this.epicFunction();
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
    });
    this.restoreSession(); */
  }
   
  get f(): { [key: string]: AbstractControl } {
    return this.ngFormLogin.controls;
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  onLogin(): void {
    this.submitted = true;
    if (this.ngFormLogin.invalid) {
      return;
    }
  
    // Iniciar sesión utilizando el servicio PocketAuthService
    this.pocketAuthService
      .loginUser(this.ngFormLogin.value.email, this.ngFormLogin.value.password)
      .subscribe(
        (data) => {
          // Manejar la respuesta del servicio de autenticación
          this.pocketAuthService.setUser(data.record);
          const { username, email, id, type } = data.record;
          this.global.currentUser = { username, email, id, type };
  
          // Establecer el tipo de usuario en localStorage
          localStorage.setItem('type', type);
  
          // Redirigir al usuario según el tipo de usuario registrado
          switch (type) {
            case 'admin':
              this.virtualRouter.routerActive = 'dashboard';
              break;
            case '':
              // Si el tipo de usuario es 'cliente', hacer la solicitud al API
              this.renderer.setAttribute(
                document.body,
                'class',
                'fixed sidebar-mini sidebar-collapse'
              );
               // Pasar el ID del cliente al método
              return; // Salir del switch para evitar redirigir a 'request'
            default:
              this.virtualRouter.routerActive = 'home';
              break;
          }
  
          // Marcar al usuario como logueado en localStorage
          localStorage.setItem('isLoggedin', 'true');
          // Actualizar los datos del cliente en la aplicación
          this.global.ClientFicha();
        },
        (error) => this.onIsError()
      );
  }
 /*  restoreSession(): void {
    const isLoggedin = localStorage.getItem('isLoggedin');
    const currentUser = localStorage.getItem('currentUser');
    const userType = localStorage.getItem('type');

    if (isLoggedin && currentUser && userType) {
      const user = JSON.parse(currentUser);
      this.global.currentUser = user;

      switch (userType) {
        case 'admin':
          this.virtualRouter.routerActive = "dashboard";
          this.virtualRouter.routerActive = "dashboard-add-properties";
          this.virtualRouter.routerActive = "dashboard";
          this.virtualRouter.routerActive = "agentes";
          this.virtualRouter.routerActive = "properties";
          break;
        case 'cliente':
          this.fetchClientData(user.id);
          break;
        default:
          this.virtualRouter.routerActive = "dashboard-add-properties";
          this.virtualRouter.routerActive = "dashboard";
          this.virtualRouter.routerActive = "agentes";
          this.virtualRouter.routerActive = "properties";


          break;
      }
    }
  } */
  /* fetchClientData(userId: string): void {
    // Crear una instancia de PocketBase
    const pb = new PocketBase('https://db.buckapi.com:8090');

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
  } */
  onRegister() {
    this.submitted = true;
    if (this.f['password'].value !== this.f['passwordConfirm'].value) {
      this.errorMessage = 'Las contraseñas no coinciden';
      this.isError = true;
      return;
    }

    let email = this.ngFormRegister.value.email;
    let password = this.ngFormRegister.value.password;
    let type = 'cliente'; // Esto debería ser 'employee' si es un empleado
    let name = this.ngFormRegister.value.name;

    this.pocketAuthService.registerUser(email, password, type,name).subscribe(
      (data) => {
        // Registro exitoso, puedes redirigir al usuario a una página de inicio de sesión o mostrar un mensaje de éxito
       /*  this.spinner.hide(); */
        console.log('Registro exitoso', data);
        // Setear el usuario y el token
        this.pocketAuthService.setUser(data);
        this.pocketAuthService.setToken(data.token);
        // Establecer que el usuario ha iniciado sesión
        localStorage.setItem('isLoggedin', 'true');
        // Establecer el tipo de usuario
        localStorage.setItem('type', type);
        // Redirigir al usuario según el tipo de usuario registrado
        switch (type) {
          case 'admin':
            this.virtualRouter.routerActive = 'admin-home';
            break;
          case 'cliente':
            this.virtualRouter.routerActive = 'user-home';
            break;
          default:
            console.error('Tipo de usuario no reconocido');
        }
        this.global.setRoute('home')
      },
      (error) => {
       /*  this.spinner.hide(); */
        this.errorMessage = 'Error al registrar usuario';
        this.isError = true;
      }
    );
  }
}
