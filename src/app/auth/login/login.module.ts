import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { BrandGraphicsComponent } from '../../shared/components/brand-graphics/brand-graphics.component';


@NgModule({
  declarations: [
    LoginComponent,
    SuccessModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrandGraphicsComponent
  ]
})
export class LoginModule { }
