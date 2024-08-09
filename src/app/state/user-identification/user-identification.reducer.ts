import { UserInfo } from "../../user-info.model";
import { identifyUser, userDoesNotExist, userExist, userCheckFailure } from "./user-identification.actions";
import { createReducer, on } from "@ngrx/store";

export interface UserInfoState {
  status: boolean;
  error: string;
}

export const initialState: UserInfoState = {
  status: false,
  error: ''
}

export const userIdentificationReducer = createReducer(
  initialState,
  on(identifyUser, (state) => ({...state, status: true})),
  on(userDoesNotExist, (state) => ({...state, status: false})),
  on(userExist, (state) => ({...state, status: false})),
  on(userCheckFailure, (state, { error }) => ({ ...state, error }))
)

