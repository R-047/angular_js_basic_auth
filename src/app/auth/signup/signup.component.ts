import { Component } from '@angular/core';
import { BasicSignupFormComponent } from './basic-signup-form/basic-signup-form.component';
import { DetailedSignupFormComponent } from './detailed-signup-form/detailed-signup-form.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Form } from '../../state/signup/singup.reducer';
import { selectFormToShow } from '../../state/signup/signup.selectors';
import { AppState } from '../../state/app.state';
import { showBasicUserForm } from '../../state/signup/signup.actions';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form = Form
  currentForm$: Observable<Form>

  constructor(private store: Store<AppState>) {
    this.currentForm$ = this.store.select(selectFormToShow);
  }

  goToBasicForm(): void {
    this.store.dispatch(showBasicUserForm())
  }

}
