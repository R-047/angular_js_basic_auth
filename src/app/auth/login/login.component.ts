import { Component, OnInit, OnDestroy } from '@angular/core';
import { selectAuthUser, selectLoginState, selectLoginStatus, selectUserName } from '../../state/login/login.selectors';
import { AppState } from '../../state/app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthUser } from '../auth-user.model';
import { fetchUserName, formSubmitted, redirectToHome, resetLoginForm, updateFormFields } from '../../state/login/login.actions';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from './success-modal/success-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  authUserInfo$: Observable<AuthUser> = this.store.select(selectAuthUser)
  loginForm: FormGroup
  loginStatus$: Observable<string | null | undefined> = this.store.select(selectLoginStatus)
  userName$: Observable<string | null | undefined> = this.store.select(selectUserName)

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ){
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      phone_number: [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.authUserInfo$.pipe(take(1)).subscribe(user_info => {
        this.route.queryParams.subscribe(params => {
          this.store.dispatch(fetchUserName({email: params['email'], phone_number: params['phone_number']}))
          if (params['email']) {
            this.loginForm.patchValue({...user_info, email:params['email'] || user_info.email});
            this.loginForm.get('email')?.enable();
            this.loginForm.get('email')?.addValidators(Validators.required)
          } else {
            this.loginForm.get('email')?.disable();
          }

          if (params['phone_number']) {
            this.loginForm.patchValue({...user_info, phone_number:params['phone_number'] || user_info.phone_number});
            this.loginForm.get('phone_number')?.enable();
            this.loginForm.get('phone_number')?.addValidators(Validators.required)
          } else {
            this.loginForm.get('phone_number')?.disable();
          }

          if(!params['phone_number'] && !params['email']){
            this.loginForm.get('email')?.enable();
            this.loginForm.patchValue(user_info);
          }
        });
    });


    this.loginForm.valueChanges.subscribe(value => {
      this.store.dispatch(updateFormFields(value));
    });

    this.userName$.subscribe(value => {
      console.log("loggin in login comp: ", value)
    })

    this.loginStatus$.subscribe(value => {
      if(value == 'success'){
        this.openDialog()
      }
    })

  }


    ngOnDestroy(): void {
      this.store.dispatch(resetLoginForm())
    }

    onLogin(){
      this.store.dispatch(formSubmitted())
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(SuccessModalComponent, {
        width: '300px', // You can set width and other options here
        data: { message: 'Hello from HomeComponent' }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.store.dispatch(redirectToHome())
        console.log('The dialog was closed');
      });
    }


}
