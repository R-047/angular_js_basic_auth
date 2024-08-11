import { createSelector } from "@ngrx/store"
import { AppState } from "../app.state"
import { SignupState } from "./singup.reducer"
import { SignUpEffects } from "./signup.effects"

export const selectSignUpState = (state: AppState) => state.signupState
export const selectBasicUserInfo = createSelector(
  selectSignUpState,
  (state: SignupState) => state.basic_user_info
)

export const selectFormToShow = createSelector(
  selectSignUpState,
  (state: SignupState) => state.current_form
)

export const selectDesignations = createSelector(
  selectSignUpState,
  (state: SignupState) => state.designation_list
)

export const selectAllowedOrganizations = createSelector(
  selectSignUpState,
  (state: SignupState) => state.allowed_organization_list
)

export const selectDetailedUserInfo = createSelector(
  selectSignUpState,
  (state: SignupState) => state.detailed_user_info
)

export const selectUserInfo = createSelector(
  selectSignUpState,
  (state: SignupState) => ({basic_user_info: state.basic_user_info, detailed_user_info: state.detailed_user_info})
)
