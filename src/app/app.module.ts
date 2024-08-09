import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './auth/login/login.module';
import { SignupModule } from './auth/signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FormsModule} from '@angular/forms';
import { UserIdentificationFormComponent } from './user-identification-form/user-identification-form.component';
import { userIdentificationReducer } from './state/user-identification/user-identification.reducer';
import { UserIdentificationEffects } from './state/user-identification/user-identification.effects';

@NgModule({
  declarations: [
    AppComponent,
    UserIdentificationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    DashboardModule,
    StoreModule.forRoot({userIdentification: userIdentificationReducer}),
    EffectsModule.forRoot([UserIdentificationEffects]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
