import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { selectAllowedOrganizations, selectDesignations, selectDetailedUserInfo } from '../../../../state/signup/signup.selectors';
import { AppState } from '../../../../state/app.state';
import { Store } from '@ngrx/store';
import { loadOrganizationDetails, registerUser, updateDetailedFormFields } from '../../../../state/signup/signup.actions';
import { Observable, startWith, map, take  } from 'rxjs';
import { Organization } from '../../models/organization.model';
import { DetailedUserInfo } from '../../models/detailed-user-info.model';
import { Form } from '../../../../state/signup/singup.reducer';

@Component({
  selector: 'app-detailed-signup-form',
  templateUrl: './detailed-signup-form.component.html',
  styleUrl: './detailed-signup-form.component.css'
})
export class DetailedSignupFormComponent implements OnInit{
  form: FormGroup;
  designationList$: Observable<string[]>;
  organizationsList$: Observable<Organization[]>;
  invalidOrganizationIdError:string | null = null
  detailedUserInfo$: Observable<DetailedUserInfo>;
  @Output() eventFromDetailedForm = new EventEmitter<{ key: string, value: string }>();


  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder
  ){
    this.detailedUserInfo$ = this.store.select(selectDetailedUserInfo)
    this.designationList$ = this.store.select(selectDesignations)
    this.organizationsList$ = this.store.select(selectAllowedOrganizations)
    this.form = this.fb.group({
        organization: this.fb.group({
          organization_id: ['', Validators.required],
          organization_name: ['', Validators.required]
        }),
        designation: ['', Validators.required],
        birth_date: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6), Validators.pattern('^[0-9]*$')]]
    });

    this.form.get('organization.organization_id')?.valueChanges
      .pipe(startWith(null), map(value => this.validateOrganization(value)))
      .subscribe();
  }


  validateOrganization(id: string) {
    this.organizationsList$.subscribe(orgList => {
      const organization = orgList.find(org => org.organization_id?.toString() === id);
      if (!organization || organization.organization_name != this.form.get('organization.organization_name')?.value) {
        this.invalidOrganizationIdError = 'Unkown organization-id';
        this.form.get('organization.organization_id')?.setErrors({ invalidOrganization: true });
      } else {
        this.invalidOrganizationIdError = null;
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrganizationDetails())
    this.detailedUserInfo$.pipe(take(1)).subscribe(detailedInfo => {
      this.form.patchValue(detailedInfo)
    })
    this.form.valueChanges.subscribe(value => {
      this.store.dispatch(updateDetailedFormFields(value));
    });


    this.form.statusChanges.subscribe(status => {
      this.eventFromDetailedForm.emit({key: Form.DETAILED_USER_INFO_FORM, value: status});
    });

  }




  onNext(){
    this.store.dispatch(registerUser())
  }
}
