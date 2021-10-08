import { AUTH_TYPES } from './types';
import axios from 'axios';
import { setAlert } from './alerts';
import setAuthToken from '../general/setAuthToken';
import { AlertTypes } from '../reducers/alerts';
import { IAuthAction, IAdmin } from '../reducers/auth';
import { ThunkDispatch } from 'redux-thunk';
import { getCurrentProfile, createProfileById } from './profile';
import { CONFIG } from '../general/Common';
import { AppState } from '../store';

//* Register User
interface IRegisterForm {
 username: string;
 password: string;
}
export const register =
 ({ username, password }: IRegisterForm) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IAuthAction>,
  getState: () => AppState
 ) => {
  const body = JSON.stringify({ password, username });
  try {
   const res = await axios.post('/api/admin/admins', body, CONFIG);
   dispatch({
    type: AUTH_TYPES.REGISTER_SUCCESS,
   });
   const user = res.data.find((p: IAdmin) => p.username === username);
   createProfileById(user._id)(dispatch, getState);
   setAlert('200-1', AlertTypes.SUCCESS)(dispatch, getState);
  } catch (err: any) {
   const errs = err.response ? err.response.data.errors : [err];
   if (errs)
    errs.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   console.error(err);
   dispatch({
    type: AUTH_TYPES.REGISTER_FAIL,
    payload: err,
   });
  }
 };

//* Load User
export const loadUser =
 () =>
 async (
  dispatch: ThunkDispatch<{}, {}, IAuthAction>,
  getState: () => AppState
 ) => {
  const token = localStorage.getItem('token');
  if (token) {
   setAuthToken(token);
  }

  try {
   dispatch({ type: AUTH_TYPES.LOADING_USER });
   const res = await axios.get('/api/admin/auth');
   if (!res.data) throw new Error();
   dispatch({
    type: AUTH_TYPES.USER_LOADED,
    payload: res.data,
   });
   getCurrentProfile()(dispatch, getState);
  } catch (err: any) {
   setAlert('400-0', AlertTypes.DANGER)(dispatch, getState);
   dispatch({
    type: AUTH_TYPES.AUTH_ERROR,
    payload: { error: { msg: "Erreur lors du chargement de l'utilisateur" } },
   });
  }
 };

//* Login User
interface ILoginForm {
 username: string;
 password: string;
}
export const login =
 ({ username, password }: ILoginForm) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IAuthAction>,
  getState: () => AppState
 ) => {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };

  const body = JSON.stringify({ username, password });
  try {
   const res = await axios.post('/api/admin/auth', body, config);
   dispatch({
    type: AUTH_TYPES.LOGIN_SUCCESS,
    payload: res.data,
   });
   setAlert('200-0', AlertTypes.SUCCESS)(dispatch, getState);
   //  const init = async () => {
   //    await getAnalyseTypes()(dispatch, getState);
   //    await getGenes()(dispatch, getState);
   //   };
   loadUser()(dispatch, getState);
  } catch (err: any) {
   const errs = err.response.data.errors;
   if (errs)
    errs.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   else setAlert('400-1', AlertTypes.DANGER)(dispatch, getState);
   dispatch({
    type: AUTH_TYPES.LOGIN_FAIL,
   });
  }
 };

//* Update User
interface IUpdateForm {
 username?: string;
 password?: string;
}
export const updateUser =
 ({ username, password }: IUpdateForm) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IAuthAction>,
  getState: () => AppState
 ) => {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };

  const body = JSON.stringify({ username, password });
  try {
   const res = await axios.put('/api/admin/auth', body, config);
   dispatch({
    type: AUTH_TYPES.USER_UPDATED,
    payload: res.data,
   });
   setAlert('200-2', AlertTypes.SUCCESS)(dispatch, getState);
  } catch (err: any) {
   const errs = err.response.data.errors;
   if (errs)
    errs.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   else setAlert('400-2', AlertTypes.DANGER)(dispatch, getState);
  }
 };

//* Logout
export const logout =
 () => async (dispatch: ThunkDispatch<{}, {}, IAuthAction>) => {
  dispatch({ type: AUTH_TYPES.LOGOUT });
 };
