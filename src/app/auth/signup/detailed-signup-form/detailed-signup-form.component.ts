import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { selectAllowedOrganizations, selectDesignations, selectDetailedUserInfo } from '../../../state/signup/signup.selectors';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { loadOrganizationDetails, registerUser, updateDetailedFormFields } from '../../../state/signup/signup.actions';
import { Observable, startWith, map, take  } from 'rxjs';
import { Organization } from '../organization.model';
import { DetailedUserInfo } from '../detailed-user-info.model';

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

    console.log(this.form.get('organization.organization_name'))
    this.form.get('organization.organization_id')?.valueChanges
      .pipe(startWith(''), map(value => this.validateOrganization(value)))
      .subscribe();
  }


  validateOrganization(id: string) {
    this.organizationsList$.subscribe(orgList => {
      const organization = orgList.find(org => org.organization_id.toString() === id);
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
      console.log(value)
      this.store.dispatch(updateDetailedFormFields(value));
    });

  }



  onNext(){
    this.store.dispatch(registerUser())
  }
}
