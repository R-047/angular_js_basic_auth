import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './auth/login/login.module';
import { SignupModule } from './auth/signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { userIdentificationReducer } from './state/user-identification/user-identification.reducer';
import { UserIdentificationEffects } from './state/user-identification/user-identification.effects';
import { HomeModule } from './home/home.module';
import { signUpReducer } from './state/signup/singup.reducer';
import { SignUpEffects } from './state/signup/signup.effects';
import { loginReducer } from './state/login/login.reducer';
import { LoginEffects } from './state/login/login.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    DashboardModule,
    StoreModule.forRoot({
      userIdentification: userIdentificationReducer,
      signupState: signUpReducer,
      loginState: loginReducer
    }),
    EffectsModule.forRoot([UserIdentificationEffects,  SignUpEffects, LoginEffects]),
    FormsModule,
    HomeModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
