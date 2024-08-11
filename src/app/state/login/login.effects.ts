import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import {
  formSubmitted, loginSuccess, loginFailed, userDoesNotExist,
  redirectToHome
} from './login.actions';
import { of, from, pipe } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Store, select} from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAuthUser } from './login.selectors';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


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
              return loginSuccess()
            }
          }),
        )
      )
    )
  );

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
