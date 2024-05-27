import { Component, OnInit} from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { Yeoman } from '../../services/yeoman.service';
import { DataApiService } from '../../services/data-api-service';
import { FormBuilder, AbstractControl, FormControlDirective, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {
  ngFormRequest: FormGroup;
  submitted = false;
  public isError = false;
  propertys:any;
constructor(
  public global:GlobalService,
  public yeoman: Yeoman,
  public dataApiService: DataApiService,
  private formBuilder: FormBuilder,

){
  this.ngFormRequest = this.formBuilder.group({
   /*  email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    di: ['', [Validators.required]],
    numWhat: ['', [Validators.required]],
    placExpd: ['', [Validators.required]],
    infLabol: ['', [Validators.required]],
    aptoPlace: ['', [Validators.required]],
    numApto: ['', [Validators.required]],
    Asesor: ['', [Validators.required]],
    inmobiliaria: ['', [Validators.required]],
    canon: ['', [Validators.required]],
    terminos: ['', [Validators.required]], */

  }); 
}
/*  */

ngOnInit(): void {
  this.ngFormRequest = this.formBuilder.group({
  
  });
}
get f(): { [key: string]: AbstractControl } {
  return this.ngFormRequest.controls;
}
onIsError(): void {
  // this.ngxService.stop("loader-02");
this.isError = true;
// this.ngxService.stop("loader-02");
setTimeout(() => {
  this.isError = false;
}, 4000);
}
}
