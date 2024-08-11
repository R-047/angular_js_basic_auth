import { UserIdentifier } from "../../home/models/user-identifier.model";
import { identifyUser, userDoesNotExist, userExist, userCheckFailure } from "./user-identification.actions";
import { createReducer, on } from "@ngrx/store";

export interface UserIdentificationState {
  status: boolean;
  error: string;
}

export const initialState: UserIdentificationState = {
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

