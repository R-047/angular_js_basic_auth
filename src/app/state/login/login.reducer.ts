import { on, createReducer} from "@ngrx/store";
import { AuthUser } from "../../auth/auth-user.model";
import { updateFormFields, formSubmitted, loginSuccess, loginFailed, resetLoginForm, setUserName} from "./login.actions";
import { UserInfo } from "../../auth/signup/user-info.model";
import { DetailedUserInfo } from "../../auth/signup/detailed-user-info.model";


export interface LoginState{
  status?: string | null | 'pending' | 'success' | 'failed',
  auth_user: AuthUser,
  user_name?: string | null,
  basic_user_info?: {
    email?:string,
    phone_number?: string,
    user_name: string
  },
  detailed_user_info?: DetailedUserInfo
}

export const initialAuthState: LoginState = {
  status: null,
  auth_user: {
    email: '',
    phone_number: '',
    password: ''
  },
  user_name: null,
  basic_user_info: {
    email: '',
    phone_number: '',
    user_name: '',
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
}

export const loginReducer = createReducer(
  initialAuthState,
  on(updateFormFields, (state, auth_info) => ({...state, auth_user: auth_info})),
  on(formSubmitted, (state) => ({...state, status: 'pending'})),
  on(loginSuccess, (state, {basic_user_info, detailed_user_info}) => ({...state, status: 'success', basic_user_info: basic_user_info, detailed_user_info: detailed_user_info })),
  on(loginFailed, (state) => ({...state, status: 'failed'})),
  on(resetLoginForm, (state) => initialAuthState),
  on(setUserName, (state, {user_name}) => ({...state, user_name: user_name}))
)

