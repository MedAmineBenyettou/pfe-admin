import { AUTH_TYPES } from './types';
import axios from 'axios';
import { setAlert } from './alerts';
import setAuthToken from '../general/setAuthToken';
import { AlertTypes } from '../reducers/alerts';
import { IAuthAction } from '../reducers/auth';
import { ThunkDispatch } from 'redux-thunk';
import { getCurrentProfile, createProfile } from './profile';

//* Register User
interface IRegisterForm {
 username: string;
 password: string;
}
export const register =
 ({ username, password }: IRegisterForm) =>
 async (dispatch: ThunkDispatch<{}, {}, IAuthAction>) => {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };

  const body = JSON.stringify({ password, username });
  try {
   const res = await axios.post('/api/admin/admins', body, config);
   dispatch({
    type: AUTH_TYPES.REGISTER_SUCCESS,
    payload: res.data,
   });
   dispatch(loadUser());
   dispatch(createProfile());
   dispatch(setAlert('Utilisateur enregistré avec succès', AlertTypes.SUCCESS));
  } catch (err) {
   const errs = err.response ? err.response.data.errors : [err];
   if (errs)
    errs.forEach((e: any) => {
     dispatch(setAlert(e.msg, AlertTypes.DANGER));
    });
   dispatch({
    type: AUTH_TYPES.REGISTER_FAIL,
   });
  }
 };

//* Load User
export const loadUser =
 () => async (dispatch: ThunkDispatch<{}, {}, IAuthAction>) => {
  const token = localStorage.getItem('token');
  if (token) {
   setAuthToken(token);
  }

  try {
   const res = await axios.get('/api/admin/auth');
   if (!res.data) throw new Error();
   dispatch({
    type: AUTH_TYPES.USER_LOADED,
    payload: res.data,
   });
   dispatch(getCurrentProfile());
  } catch (err) {
   dispatch(
    setAlert("Erreur lors du chargement de l'utilisateur", AlertTypes.DANGER)
   );
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
 async (dispatch: ThunkDispatch<{}, {}, IAuthAction>) => {
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

   dispatch(setAlert('Utilisateur connecté avec succès', AlertTypes.SUCCESS));
   dispatch(loadUser());
  } catch (err) {
   const errs = err.response.data.errors;
   if (errs)
    errs.forEach((e: any) => {
     dispatch(setAlert(e.msg, AlertTypes.DANGER));
    });
   else dispatch(setAlert('Erreur de login', AlertTypes.DANGER));
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
 async (dispatch: ThunkDispatch<{}, {}, IAuthAction>) => {
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

   dispatch(setAlert('Options modifiées avec succès', AlertTypes.SUCCESS));
  } catch (err) {
   const errs = err.response.data.errors;
   if (errs)
    errs.forEach((e: any) => {
     dispatch(setAlert(e.msg, AlertTypes.DANGER));
    });
   else
    dispatch(
     setAlert('Erreur lors de la modification du profil', AlertTypes.DANGER)
    );
  }
 };

//* Logout
export const logout =
 () => async (dispatch: ThunkDispatch<{}, {}, IAuthAction>) => {
  dispatch({ type: AUTH_TYPES.LOGOUT });
 };
