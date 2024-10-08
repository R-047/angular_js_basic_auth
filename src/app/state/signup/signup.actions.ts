import { createAction, props } from "@ngrx/store";
import { UserInfo } from "../../auth/signup/models/user-info.model";
import { SignupState } from "./singup.reducer";
import { BasicUserInfo } from "../../auth/signup/models/basic-user-info.model";
import { Organization } from "../../auth/signup/models/organization.model";
import { DetailedUserInfo } from "../../auth/signup/models/detailed-user-info.model";
import { UserIdentifier } from "../../home/models/user-identifier.model";



export const updateBasicFormFields = createAction(
  '[Signup Page] Update Basic Form Field',
  props<BasicUserInfo>()
);

export const updateDetailedFormFields = createAction(
  '[Signup Page] Update Detailed Form Field',
  props<DetailedUserInfo>()
);

export const showBasicUserForm = createAction(
  '[Signup Page] Show Basic User Form'
)

export const showDetailedUserForm = createAction(
  '[Signup Page] Show Detailed User Form'
)

export const registerUser = createAction(
  '[Signup page] Submitted Final Form',
)

export const userRegisteredSuccesfully = createAction(
  '[Signup page] Registered New User',
  props<UserIdentifier>()
)

export const userAlreadyExist = createAction(
  '[Signup Page] User Already exist',
  props<UserIdentifier>()
)

export const loadOrganizationDetails = createAction(
  '[Signup Page] Load Organization Details',
)

export const organizationDetailsLoaded = createAction(
  '[Signup Page] Organization Details Loaded',
  props<{designation_list:string[], organization_list: Organization[]}>()
)
