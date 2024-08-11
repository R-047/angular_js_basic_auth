import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import {
  identifyUser,
  userExist,
  userDoesNotExist,
  userCheckFailure
} from './user-identification.actions';
import { of, from, pipe } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserIdentificationResponse } from '../../home/models/user-identification-response.model';
import { UserService } from '../../services/user.service';
import { setUserName } from '../login/login.actions';

@Injectable()
export class UserIdentificationEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private service : UserService
  ) {}

  identifyUser$ = createEffect(() => this.actions$.pipe(
    ofType(identifyUser),
    mergeMap(userInfo => from(this.service.checkIfUserExist(userInfo)).pipe(
      map((response: UserIdentificationResponse) => {
        const queryParams = {
          email: userInfo.email,
          phone_number: userInfo.phone_number,
        };
        if (response.user_exist) {
          this.router.navigate(['/auth/login'], { queryParams });
          return userExist();
        } else {
          this.router.navigate(['/auth/signup'], { queryParams});
          return userDoesNotExist();
        }
      }),
      catchError((error) => of(userCheckFailure({error: error.error})))  // Handle any errors
    ))
  ));

}


