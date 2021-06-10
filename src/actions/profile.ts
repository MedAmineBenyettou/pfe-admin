import axios from 'axios';
import { setAlert } from './alerts';
import { PROFILE_TYPES } from './types';
import { CONFIG } from '../general/Common';
import { AlertTypes } from '../reducers/alerts';
import { IProfile, IProfileAction } from '../reducers/profile';
import { ThunkDispatch } from 'redux-thunk';

//* Get Current User's Profile
export const getCurrentProfile =
 () => async (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  try {
   const res = await axios.get('/api/profile/me');
   dispatch({
    type: PROFILE_TYPES.GET_PROFILE,
    payload: res.data,
   });
  } catch (err) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     dispatch(setAlert(e.msg, AlertTypes.DANGER));
    });
   }
   dispatch({
    type: PROFILE_TYPES.PROFILE_ERROR,
    payload: { msg: err.response.statusText },
   });
  }
 };

//* Create Profile

export interface IProfileFormData {}

export const createProfile =
 (formData: IProfileFormData) =>
 async (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  try {
   const res = await axios.post('/api/profile', formData, CONFIG);
   dispatch({
    type: PROFILE_TYPES.PROFILE_CREATION_SUCCESS,
    payload: res.data,
   });
  } catch (err) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     dispatch(setAlert(e.msg, AlertTypes.DANGER));
    });
   }
   dispatch({
    type: PROFILE_TYPES.PROFILE_CREATION_FAIL,
    payload: { msg: err.response.statusText },
   });
   dispatch(deleteAccount());
  }
 };

//* Update profile
export const updateProfile =
 (formData: Partial<IProfileFormData>) =>
 async (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  try {
   const res = await axios.put('/api/profile', formData, CONFIG);
   dispatch({
    type: PROFILE_TYPES.PROFILE_UPDATE_SUCCESS,
    payload: res.data,
   });
   dispatch(setAlert('4', AlertTypes.SUCCESS));
  } catch (err) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     dispatch(setAlert(e.msg, AlertTypes.DANGER));
    });
   }

   dispatch({
    type: PROFILE_TYPES.PROFILE_UPDATE_FAIL,
    payload: { msg: err.response.statusText },
   });
  }
 };

//* Delete Account
export const deleteAccount =
 () => async (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  try {
   await axios.delete('/api/profile');
   dispatch({ type: PROFILE_TYPES.CLEAR_PROFILE });
   dispatch({ type: PROFILE_TYPES.ACCOUNT_DELETED });

   dispatch(setAlert('6', AlertTypes.SUCCESS));
  } catch (err) {
   dispatch({
    type: PROFILE_TYPES.PROFILE_ERROR,
    payload: { msg: err.response.statusText },
   });
  }
 };

//* Get All Profiles
export const getAllProfiles =
 () => async (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  try {
   dispatch({
    type: PROFILE_TYPES.GETTING_PROFILES,
   });
   const res = await axios.get('/api/profile');
   dispatch({
    type: PROFILE_TYPES.GETTING_PROFILES_SUCCESS,
    payload: { profiles: res.data },
   });
  } catch (err) {
   dispatch({
    type: PROFILE_TYPES.ERROR_GETTING_PROFILES,
    payload: { msg: err.response.statusText },
   });
  }
 };

//* sets Target's Profile
export const setTargetProfile =
 (profile: IProfile) => (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  dispatch({
   type: PROFILE_TYPES.SETTING_TARGET_PROFILE,
   payload: { profile },
  });
 };

// Gets Target's Profile
export const getTargetProfile =
 (id: string) => async (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  try {
   dispatch({
    type: PROFILE_TYPES.GETTING_TARGET_PROFILE,
   });
   const res = await axios.get(`/api/profile/${id}`);
   dispatch({
    type: PROFILE_TYPES.GETTING_TARGET_PROFILE_SUCCESS,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: PROFILE_TYPES.ERROR_GETTING_TARGET_PROFILE,
    payload: { msg: '50008' },
   });
  }
 };

// Checks profile page
export const checkProfilePage =
 (id: string) =>
 (dispatch: ThunkDispatch<{}, {}, IProfileAction>, getState: any) => {
  if (getState().profile.targetProfile.error) {
   dispatch(getTargetProfile(id));
  }
 };
