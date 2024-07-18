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
  submitted = false;
  public isError = false;
  propertys:any;
constructor(
  public global:GlobalService,
  public yeoman: Yeoman,
  public dataApiService: DataApiService,
  private formBuilder: FormBuilder,

){
 
}
view(property:any){
  this.global.previewCard=property;
  this.global.setRoute('property-detail');
  
}
/* onIsError(): void {
  this.isError = true;
  setTimeout(() => {
    this.isError = false;
  }, 4000);
} */

}
