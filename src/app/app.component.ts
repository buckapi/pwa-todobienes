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
    PropertyDetailComponent
  
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'camiwa';
  constructor(
    public global: GlobalService,
    public script: ScriptService,
    public virtualRouter: virtualRouter
  ) {
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
        'priceRanger'
      )
      .then(() => {
        console.log('Todos los scripts se cargaron correctamente');
      })
      .catch((error) => console.log(error));
    // this.epicFunction();
  }
}
