import { LoginState } from "./login/login.reducer";
import { SignupState } from "./signup/singup.reducer";
import { UserIdentificationState } from "./user-identification/user-identification.reducer";

export interface AppState{
  userIdentification: UserIdentificationState;
  signupState: SignupState;
  loginState: LoginState;
}
