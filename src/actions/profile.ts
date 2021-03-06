import axios from 'axios';
import { setAlert } from './alerts';
import { PROFILE_TYPES } from './types';
import { CONFIG } from '../general/Common';
import { AlertTypes } from '../reducers/alerts';
import { IProfile, IProfileAction } from '../reducers/profile';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';

//* Get Current User's Profile
export const getCurrentProfile =
 () =>
 async (
  dispatch: ThunkDispatch<{}, {}, IProfileAction>,
  getState: () => AppState
 ) => {
  try {
   const res = await axios.get('/api/admin/profile/me');
   if (!res) createProfile();
   dispatch({
    type: PROFILE_TYPES.GET_PROFILE,
    payload: res.data,
   });
  } catch (err: any) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   }
   dispatch({
    type: PROFILE_TYPES.PROFILE_ERROR,
    payload: { msg: err.response.statusText },
   });
  }
 };

//* Create Profile

export interface IProfileFormData {
 user?: {
  username: string;
 };
 nom?: string;
 prenom?: string;
 fonction?: string;
 phoneNumber?: string;
}

export const createProfile =
 (formData?: IProfileFormData) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IProfileAction>,
  getState: () => AppState
 ) => {
  try {
   const res = await axios.post('/api/admin/profile', formData, CONFIG);
   dispatch({
    type: PROFILE_TYPES.PROFILE_CREATION_SUCCESS,
    payload: res.data,
   });
  } catch (err: any) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   }
   dispatch({
    type: PROFILE_TYPES.PROFILE_CREATION_FAIL,
    payload: { msg: err.response.statusText },
   });
  }
 };

export const createProfileById =
 (id: string, formData?: IProfileFormData) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IProfileAction>,
  getState: () => AppState
 ) => {
  try {
   const res = await axios.post(`/api/admin/profile/${id}`, formData, CONFIG);
   dispatch({
    type: PROFILE_TYPES.OTHER_PROFILE_CREATION_SUCCESS,
    payload: res.data,
   });
  } catch (err: any) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   }
   dispatch({
    type: PROFILE_TYPES.OTHER_PROFILE_CREATION_FAIL,
    payload: { msg: err.response.data.msg },
   });
  }
 };

//* Update profile
export const updateProfile =
 (formData: Partial<IProfileFormData>) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IProfileAction>,
  getState: () => AppState
 ) => {
  try {
   const res = await axios.put('/api/admin/profile', formData, CONFIG);
   dispatch({
    type: PROFILE_TYPES.PROFILE_UPDATE_SUCCESS,
    payload: res.data,
   });
   setAlert('Profil mis ?? jour', AlertTypes.SUCCESS)(dispatch, getState);
  } catch (err: any) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   }

   dispatch({
    type: PROFILE_TYPES.PROFILE_UPDATE_FAIL,
    payload: { msg: err.response.statusText },
   });
  }
 };
export const updateProfileById =
 (id: string, formData: Partial<IProfileFormData>) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IProfileAction>,
  getState: () => AppState
 ) => {
  try {
   const res = await axios.put(`/api/admin/profile/${id}`, formData, CONFIG);
   dispatch({
    type: PROFILE_TYPES.OTHER_PROFILE_UPDATE_SUCCESS,
    payload: res.data,
   });
   setAlert('Profil mis ?? jour', AlertTypes.SUCCESS)(dispatch, getState);
  } catch (err: any) {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   }
   dispatch({
    type: PROFILE_TYPES.OTHER_PROFILE_UPDATE_FAIL,
    payload: { msg: err.response.data.msg },
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
   const res = await axios.get('/api/admin/profile');
   dispatch({
    type: PROFILE_TYPES.GETTING_PROFILES_SUCCESS,
    payload: res.data,
   });
  } catch (err: any) {
   dispatch({
    type: PROFILE_TYPES.ERROR_GETTING_PROFILES,
    payload: { msg: err.response.statusText },
   });
  }
 };

//* sets Target's Profile
export const setTargetProfile =
 (profile: IProfile | null) =>
 (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  dispatch({
   type: PROFILE_TYPES.SETTING_TARGET_PROFILE,
   payload: profile,
  });
 };

// Gets Target's Profile
export const getTargetProfile =
 (id: string) => async (dispatch: ThunkDispatch<{}, {}, IProfileAction>) => {
  try {
   dispatch({
    type: PROFILE_TYPES.GETTING_TARGET_PROFILE,
   });
   const res = await axios.get(`/api/admin/profile/${id}`);
   dispatch({
    type: PROFILE_TYPES.GETTING_TARGET_PROFILE_SUCCESS,
    payload: res.data,
   });
  } catch (err: any) {
   dispatch({
    type: PROFILE_TYPES.ERROR_GETTING_TARGET_PROFILE,
    payload: {
     msg: "Erreur lors de l'obtention du profil ! R??essayez plus tard. ",
    },
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
