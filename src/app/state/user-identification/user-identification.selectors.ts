import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserIdentificationState } from './user-identification.reducer';


export const selectUserIdentification = (state: AppState) => state.userIdentification;
export const selectUserIdentificationStatus = createSelector(
  selectUserIdentification,
  (state: UserIdentificationState) => state.status
);
