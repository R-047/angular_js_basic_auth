import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { UserIdentificationFormComponent } from './components/user-identification-form/user-identification-form.component';
import {FormsModule} from '@angular/forms';
import { BrandGraphicsComponent } from '../shared/components/brand-graphics/brand-graphics.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserIdentificationFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrandGraphicsComponent
  ]
})
export class HomeModule { }
