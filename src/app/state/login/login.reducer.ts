import { on, createReducer} from "@ngrx/store";
import { AuthUser } from "../../auth/auth-user.model";
import { updateFormFields, formSubmitted, loginSuccess, loginFailed, resetLoginForm, setUserName} from "./login.actions";


export interface LoginState{
  status?: string | null | 'pending' | 'success' | 'failed',
  auth_user: AuthUser,
  user_name?: string | null
}

export const initialAuthState: LoginState = {
  status: null,
  auth_user: {
    email: '',
    phone_number: '',
    password: ''
  },
  user_name: null
}

export const loginReducer = createReducer(
  initialAuthState,
  on(updateFormFields, (state, auth_info) => ({...state, auth_user: auth_info})),
  on(formSubmitted, (state) => ({...state, status: 'pending'})),
  on(loginSuccess, (state) => ({...state, status: 'success'})),
  on(loginFailed, (state) => ({...state, status: 'failed'})),
  on(resetLoginForm, (state) => initialAuthState),
  on(setUserName, (state, {user_name}) => ({...state, user_name: user_name}))
)

