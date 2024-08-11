import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { SignupState } from '../../../state/signup/singup.reducer';
import { AppState } from '../../../state/app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import { showDetailedUserForm, updateBasicFormFields } from '../../../state/signup/signup.actions';
import { BasicUserInfo } from '../basic-user-info.model';
import { selectBasicUserInfo } from '../../../state/signup/signup.selectors';
import { ActivatedRoute } from '@angular/router';
import { Form } from '../../../state/signup/singup.reducer';


@Component({
  selector: 'app-basic-signup-form',
  templateUrl: './basic-signup-form.component.html',
  styleUrl: './basic-signup-form.component.css'
})
export class BasicSignupFormComponent implements OnInit {
  basicUserInfo$ : Observable<BasicUserInfo> = this.store.select(selectBasicUserInfo)
  userForm: FormGroup;
  @Output() eventFromBasicForm = new EventEmitter<{ key: string, value: string }>();

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      email: ['', Validators.email],
      phone_number: [''],
      user_name: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(){

    this.basicUserInfo$.pipe(take(1)).subscribe(user_info => {

        this.route.queryParams.subscribe(params => {
          if (params['email']) {
            this.userForm.patchValue({...user_info, email: user_info.email || params['email']});
            this.userForm.get('email')?.enable();
            this.userForm.get('email')?.addValidators(Validators.required)
          } else {
            this.userForm.get('email')?.disable();
          }

          if (params['phone_number']) {
            this.userForm.patchValue({...user_info, phone_number:params['phone_number'] || user_info.phone_number});
            this.userForm.get('phone_number')?.enable();
            this.userForm.get('phone_number')?.addValidators(Validators.required)
          } else {
            this.userForm.get('phone_number')?.disable();
          }

          if(!params['phone_number'] && !params['email']){
            this.userForm.get('email')?.enable();
            this.userForm.patchValue(user_info);
          }
        });
    });

    this.userForm.statusChanges.subscribe(status => {
      this.eventFromBasicForm.emit({key: Form.BASIC_USER_INFO_FORM, value: status});
    });

    this.userForm.valueChanges.subscribe(value => {
      this.store.dispatch(updateBasicFormFields(value));
    });
  }

  onNext(){
    this.store.dispatch(showDetailedUserForm())
  }
}
