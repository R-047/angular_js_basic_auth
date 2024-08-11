import { BasicUserInfo } from "../../auth/signup/models/basic-user-info.model";
import { DetailedUserInfo } from "../../auth/signup/models/detailed-user-info.model";
import { Organization } from "../../auth/signup/models/organization.model";
import { createReducer, on } from "@ngrx/store";
import { organizationDetailsLoaded, showBasicUserForm, showDetailedUserForm, registerUser, updateBasicFormFields, updateDetailedFormFields, userRegisteredSuccesfully } from "./signup.actions";


export enum Form {
  BASIC_USER_INFO_FORM = 'basic-form',
  DETAILED_USER_INFO_FORM = 'detailed-form'
}

export interface SignupState{
  current_form: Form;
  basic_user_info: BasicUserInfo;
  detailed_user_info: DetailedUserInfo;
  allowed_organization_list: Organization[];
  designation_list: string[];
  form_submitted: boolean;
  status_message: string; 
  error: string;
}

export const initialSignupState: SignupState = {
  current_form: Form.BASIC_USER_INFO_FORM,
  basic_user_info: {
    email: '',
    phone_number: '',
    user_name: '',
    password: '',
  },
  detailed_user_info: {
    organization: {
      organization_id: null,
      organization_name: '',
    },
    designation: '',
    birth_date: new Date(),
    city: '',
    pincode: null
  },
  allowed_organization_list: [],
  designation_list: [],
  form_submitted: false,
  error: "",
  status_message: ""
}


export const signUpReducer = createReducer(
  initialSignupState,
  // on(updateBasicFormFields, (state, {key, value}) => ({
  //   ...state,
  //   basic_user_info: {
  //     ...state.basic_user_info,
  //     [key]:value
  //   }
  // })),


  on(updateBasicFormFields, (state, basic_user_info) => ({
    ...state,
    basic_user_info
  })),

  on(updateDetailedFormFields, (state, detailed_user_info) => ({
    ...state,
    detailed_user_info
  })),

  on(showBasicUserForm, state  => ({...state, current_form: Form.BASIC_USER_INFO_FORM})),

  on(showDetailedUserForm, state  => ({...state, current_form: Form.DETAILED_USER_INFO_FORM})),

  on(registerUser, (state) => ({...state, form_submitted: true})),

  on(userRegisteredSuccesfully, (state) => initialSignupState),

  on(organizationDetailsLoaded, (state, {organization_list, designation_list}) => ({
    ...state,
    allowed_organization_list: organization_list,
    designation_list: designation_list
  }))
)
