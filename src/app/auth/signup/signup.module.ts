import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { BasicSignupFormComponent } from './components/basic-signup-form/basic-signup-form.component';
import { DetailedSignupFormComponent } from './components/detailed-signup-form/detailed-signup-form.component';
import { BrandGraphicsComponent } from '../../shared/components/brand-graphics/brand-graphics.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StatusCardComponent } from '../../shared/components/status-card/status-card.component';


@NgModule({
  declarations: [
    SignupComponent,
    BasicSignupFormComponent,
    DetailedSignupFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrandGraphicsComponent,
    StatusCardComponent,
    MatIconModule,
    MatButtonModule,
  ]
})
export class SignupModule { }
