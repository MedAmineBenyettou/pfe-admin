import axios from 'axios';
import { setAlert } from './alerts';
import { USER_PROFILE_TYPES } from './types';
import { CONFIG } from '../general/Common';
import { AlertTypes } from '../reducers/alerts';
import { IUserProfile, IUserProfileAction } from '../reducers/userProfiles';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';

export interface IUserProfileFormData {
 user?: {
  email?: string;
  isEnabled?: boolean;
 };
 nom?: string;
 prenom?: string;
 dateOfBirth?: Date;
 birthLocation?: string;
 adresse?: string;
 phoneNumber?: string;
}

//* Update profile
export const updateUserProfileById =
 (id: string, formData: Partial<IUserProfileFormData>) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IUserProfileAction>,
  getState: () => AppState
 ) => {
  try {
   const res = await axios.put(`/api/profile/${id}`, formData, CONFIG);
   dispatch({
    type: USER_PROFILE_TYPES.USER_PROFILE_UPDATE_SUCCESS,
    payload: res.data,
   });
   setAlert('200-3', AlertTypes.SUCCESS)(dispatch, getState);
   getAllUsersProfiles()(dispatch, getState);
  } catch (err: any) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   }

   dispatch({
    type: USER_PROFILE_TYPES.USER_PROFILE_UPDATE_FAIL,
    payload: { msg: err.response.statusText },
   });
  }
 };

//* Get All Profiles
export const getAllUsersProfiles =
 () =>
 async (
  dispatch: ThunkDispatch<{}, {}, IUserProfileAction>,
  getState: () => AppState
 ) => {
  try {
   dispatch({
    type: USER_PROFILE_TYPES.GETTING_USER_PROFILES,
   });
   const res = await axios.get('/api/profile');
   dispatch({
    type: USER_PROFILE_TYPES.GETTING_USER_PROFILES_SUCCESS,
    payload: res.data,
   });
  } catch (err: any) {
   const errs = err.response ? err.response.data.errors : [err];
   if (errs)
    errs.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   console.error(err);
   dispatch({
    type: USER_PROFILE_TYPES.ERROR_GETTING_USER_PROFILES,
    payload: { msg: err.response },
   });
  }
 };

//* sets Target's Profile
export const setTargetUserProfile =
 (profile: IUserProfile | null) =>
 (dispatch: ThunkDispatch<{}, {}, IUserProfileAction>) => {
  dispatch({
   type: USER_PROFILE_TYPES.SETTING_TARGET_USER_PROFILE,
   payload: profile,
  });
 };

// Gets Target's Profile
export const getTargetUserProfile =
 (id: string) =>
 async (dispatch: ThunkDispatch<{}, {}, IUserProfileAction>) => {
  try {
   dispatch({
    type: USER_PROFILE_TYPES.GETTING_TARGET_USER_PROFILE,
   });
   const res = await axios.get(`/api/profile/${id}`);
   dispatch({
    type: USER_PROFILE_TYPES.GETTING_TARGET_USER_PROFILE_SUCCESS,
    payload: res.data,
   });
  } catch (err: any) {
   dispatch({
    type: USER_PROFILE_TYPES.ERROR_GETTING_TARGET_USER_PROFILE,
    payload: {
     msg: "Erreur lors de l'obtention du profil! Réessayez plus tard. ",
    },
   });
  }
 };
