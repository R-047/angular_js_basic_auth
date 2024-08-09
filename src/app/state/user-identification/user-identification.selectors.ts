import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserInfoState } from './user-identification.reducer';

export const featureKey = 'app';

// export const selectUserIndentificationState = createFeatureSelector<AppState>(featureKey);
//
// export const selectUserIdentificationStatus = createSelector(
//   selectUserIndentificationState,
//   (state:AppState) => state.userIdentification.status
// )
export const selectUserIdentification = (state: AppState) => state.userIdentification;
export const selectUserIdentificationStatus = createSelector(
  selectUserIdentification,
  (state: UserInfoState) => state.status
);
