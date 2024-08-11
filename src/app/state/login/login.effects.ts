import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import {
  formSubmitted, loginSuccess, loginFailed, userDoesNotExist,
  redirectToHome,
  fetchUserName,
  setUserName,
  fetchUserDetails,
  userDetailsLoaded
} from './login.actions';
import { of, from, pipe } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Store, select} from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAuthUser } from './login.selectors';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserIdentificationResponse } from '../../home/user-identification-response.model';


@Injectable()
export class LoginEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(formSubmitted),
      withLatestFrom(this.store.pipe(select(selectAuthUser))),
      switchMap(([action, authUser]) =>
        this.userService.loginUser(authUser).pipe(
          map((response) => {
            if(!response.success){
              return userDoesNotExist()
            }
            console.log(response)
            if(response.message){
              return loginFailed()
            }else{
              return loginSuccess({
                basic_user_info: response.basic_user_info, detailed_user_info: response.detailed_user_info
              })
            }
          }),
        )
      )
    )
  );



  fetchUserName = createEffect(() => this.actions$.pipe(
    ofType(fetchUserName),
    mergeMap(userInfo => from(this.userService.checkIfUserExist(userInfo)).pipe(
      map((response: UserIdentificationResponse) => {
          return setUserName({user_name: response.user_name});
      }),
    ))
  ));


  redirectToSignup$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userDoesNotExist),
        map(() => this.router.navigate(['/signup']))
      ),
    { dispatch: false }
  );

  redirectToLogin$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(redirectToHome),
        map(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
