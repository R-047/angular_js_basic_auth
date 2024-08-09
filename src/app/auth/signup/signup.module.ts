import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { BasicSignupFormComponent } from './basic-signup-form/basic-signup-form.component';
import { DetailedSignupFormComponent } from './detailed-signup-form/detailed-signup-form.component';



@NgModule({
  declarations: [
    SignupComponent,
    BasicSignupFormComponent,
    DetailedSignupFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SignupModule { }
