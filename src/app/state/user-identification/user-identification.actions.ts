import { createAction, props } from "@ngrx/store";
import { UserIdentifier } from "../../home/user-identifier.model";

export const identifyUser = createAction(
  '[User Info Page] check if user exist or not',
    props<UserIdentifier>()
)

export const userDoesNotExist = createAction(
  '[User Info Page] user does not exist',
)

export const userExist = createAction(
  '[User Info Page] user exist',
)

export const userCheckFailure = createAction(
  '[User Info Page] user check failure',
  props<{ error: string }>()
);
