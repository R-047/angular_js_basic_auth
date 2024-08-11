import { createSelector } from "@ngrx/store"
import { AppState } from "../app.state"
import { LoginState } from "./login.reducer"


export const selectLoginState = (state: AppState) => state.loginState

export const selectAuthUser = createSelector(
  selectLoginState,
  (state: LoginState) => state.auth_user
)

export const selectLoginStatus = createSelector(
  selectLoginState,
  (state: LoginState) => state.status
)

export const selectUserName = createSelector(
  selectLoginState,
  (state: LoginState) => state.user_name
)

export const selectUserDetails = createSelector(
  selectLoginState,
  (state: LoginState) => ({basic_user_info: state.basic_user_info, detailed_user_info: state.detailed_user_info})
)
