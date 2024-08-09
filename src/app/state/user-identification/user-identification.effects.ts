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
import { UserIdentificationService } from '../../services/user-identification.service';
import { Router } from '@angular/router';

@Injectable()
export class UserIdentificationEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private service : UserIdentificationService
  ) {}

  identifyUser$ = createEffect(() => this.actions$.pipe(
    ofType(identifyUser),
    mergeMap(userInfo => from(this.service.checkIfUserExist(userInfo)).pipe(
      map((doesExist: boolean) => {
        const queryParams = {
          email: userInfo.email,
          phoneNumber: userInfo.phone_number,
        };

        console.log("triggerd identify user effect: ", queryParams)

        if (doesExist) {
          this.router.navigate(['/login'], { queryParams });
          return userExist();
        } else {
          this.router.navigate(['/signup'], { queryParams });
          return userDoesNotExist();
        }
      }),
      catchError(() => of(userDoesNotExist()))  // Handle any errors
    ))
  ));
}


