import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalService } from './services/global.service';
import { CommonModule } from '@angular/common';
import { ScriptService } from './services/script.service';
import { MapwrapperComponent } from './components/mapwrapper/mapwrapper.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { HeaderHomeComponent } from './components/ui/header-home/header-home.component';
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
import { FormBuilder, ReactiveFormsModule, AbstractControl,  FormGroup, Validators, } from '@angular/forms';
import PocketBase from 'pocketbase';
 
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
    HeaderHomeComponent,
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
  constructor(
    public global: GlobalService,
    public script: ScriptService,
    public virtualRouter: virtualRouter,
    public autRest: AuthRESTService,
    public pocketAuthService: PocketAuthService, 
    public formBuilder: FormBuilder
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
        'apexcharts',
        'jqueryCookie',
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
    // if (this.ngFormLogin.invalid) {
    //   return;
    // }

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
            case 'traveler':
              // Si el tipo de usuario es 'cliente', hacer la solicitud al API
            /*   this.renderer.setAttribute(
                document.body,
                'class',
                'fixed sidebar-mini sidebar-collapse'
              ); */
              this.fetchClientData(id); // Pasar el ID del cliente al método
              break;
            default:
              this.virtualRouter.routerActive = 'dashboard';
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

  fetchClientData(userId: string): void {
    // Crear una instancia de PocketBase
    const pb = new PocketBase('https://db.buckapi.com:8090');

    // Hacer la solicitud para obtener los datos del cliente
    pb.collection('camiwaTravelers')
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
