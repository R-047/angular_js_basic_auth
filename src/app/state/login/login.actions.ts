import { createAction, props } from "@ngrx/store";
import { AuthUser } from "../../auth/auth-user.model";
import { UserIdentifier } from "../../home/user-identifier.model";


export const updateFormFields = createAction(
  '[Login Page] Update Login Form Fields',
  props<AuthUser>()
)

export const formSubmitted = createAction(
  '[Login Page] Form Submitted'
)

export const loginSuccess = createAction(
  '[Login Page] Login Success'
)

export const loginFailed = createAction(
  '[Login Page] Login Failed'
)

export const resetLoginForm = createAction(
  '[Login Page] Reset Login Form'
)

export const redirectToHome = createAction(
  '[Login Page] Redirect to Home'
)

export const userDoesNotExist = createAction(
  '[Login Page] User Does Not Exist'
)

export const setUserName = createAction(
  '[Login Page] User name is set',
  props<{user_name?: string | null}>()
)

export const fetchUserName = createAction(
  '[Login Page] Fetching User Name',
  props<UserIdentifier>()
)

