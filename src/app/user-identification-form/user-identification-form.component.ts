import { Component } from '@angular/core';
import { UserInfo } from '../user-info.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserIdentificationStatus } from '../state/user-identification/user-identification.selectors';
import { identifyUser } from '../state/user-identification/user-identification.actions';
import { AppState } from '../state/app.state';

@Component({
  selector: 'app-user-identification-form',
  templateUrl: './user-identification-form.component.html',
  styleUrl: './user-identification-form.component.css'
})
export class UserIdentificationFormComponent {
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.loading$ = this.store.select(selectUserIdentificationStatus);
  }

  userInfoModel: UserInfo = {
    email: '',
    phone_number: ''
  };

  isFormValid(): boolean {
    const hasEmail = !!this.userInfoModel.email;
    const hasPhone = !!this.userInfoModel.phone_number;
    return (hasEmail && !hasPhone) || (!hasEmail && hasPhone);
  }

  onSubmit(form:any) {
    if(form.valid){

    }
    if (this.isFormValid()) {
      console.log('Form Submitted!', this.userInfoModel); // Access form data from the model
      this.store.dispatch(identifyUser(this.userInfoModel))
    } else {
      alert('Please provide either an email or phone number.');
    }
  }
}
