import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import {
  loadOrganizationDetails,
  organizationDetailsLoaded,
  registerUser,
  userAlreadyExist,
  userRegisteredSuccesfully

} from './signup.actions';
import { of, from, pipe } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { OrganizationService } from '../../services/organization.service';
import { Store, select} from '@ngrx/store';
import { AppState } from '../app.state';
import { selectUserInfo } from './signup.selectors';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class SignUpEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private organizationDetailsService : OrganizationService,
    private userService: UserService,
    private router: Router
  ) {}

  loadOrganizationData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrganizationDetails),
      mergeMap(() => this.organizationDetailsService.getOrganizationData().pipe(
        map(data => {
          return organizationDetailsLoaded({designation_list: data.designations, organization_list: data.allowedOrganizations})
        }
           ),
        catchError(() => of({ type: '[Organization API] Load Failure' }))
      ))
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      withLatestFrom(this.store.pipe(select(selectUserInfo))),
      switchMap(([action, userInfo]) =>
        this.userService.registerUser(userInfo).pipe(
          map((response) => {
            if(response.success){
              return userRegisteredSuccesfully({email: userInfo.basic_user_info.email, phone_number: userInfo.basic_user_info.phone_number})
            }else{
              return userAlreadyExist({email: userInfo.basic_user_info.email, phone_number: userInfo.basic_user_info.phone_number})
            }
          }),
        )
      )
    )
  );

  redirectToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userRegisteredSuccesfully, userAlreadyExist),
        map((queryParams) => this.router.navigate(['/auth/login'], {queryParams}))
      ),
    { dispatch: false }
  );
}
