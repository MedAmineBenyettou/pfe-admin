import { AUTH_TYPES } from './types';
import axios from 'axios';
//import { setAlert } from './alert';
import setAuthToken from '../general/setAuthToken';
import { Dispatch } from 'redux';
//import { getCurrentProfile, createProfile } from './profile';

type AuthDispatch =
 | Dispatch<{ type: AUTH_TYPES; payload?: any }>
 | ((...args: any[]) => any);

//* Register User
interface IRegister {
 username: string;
 password: string;
}
export const register =
 ({ username, password }: IRegister) =>
 async (dispatch: AuthDispatch) => {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };

  const body = JSON.stringify({ password, username });
  try {
   const res = await axios.post('/api/users', body, config);
   dispatch({
    type: AUTH_TYPES.REGISTER_SUCCESS,
    payload: res.data,
   });
   dispatch(loadUser());
   //dispatch(createProfile({ dateOfBirth }, true));
   const msg = 'User registered successfully';
   //dispatch(setAlert(msg, 'success'));
  } catch (err) {
   const errs = err.response ? err.response.data.errors : [err];
   //if (errs) errs.forEach((e) => {dispatch(setAlert(e.msg, 'danger'))});
   dispatch({
    type: AUTH_TYPES.REGISTER_FAIL,
   });
  }
 };

//* Load User
export const loadUser = () => async (dispatch: AuthDispatch) => {
 const token = localStorage.getItem('token');
 if (token) {
  setAuthToken(token);
 }

 try {
  const res = await axios.get('/api/auth');
  if (!res.data) throw new Error();
  dispatch({
   type: AUTH_TYPES.USER_LOADED,
   payload: res.data,
  });
 } catch (err) {
  dispatch({
   type: AUTH_TYPES.AUTH_ERROR,
  });
 }
};

//* Login User
interface ILogin {
 username: string;
 password: string;
}
export const login =
 ({ username, password }: ILogin) =>
 async (dispatch: AuthDispatch) => {
  const config = {
   headers: {
    'Content-Type': 'application/json',
   },
  };

  const body = JSON.stringify({ username, password });
  try {
   const res = await axios.post('/api/auth', body, config);
   dispatch({
    type: AUTH_TYPES.LOGIN_SUCCESS,
    payload: res.data,
   });

   //dispatch(setAlert("User logged in Successfully", 'success'));
   dispatch(loadUser());
   //dispatch(getCurrentProfile());
  } catch (err) {
   const errs = err.response.data.errors;
   //  if (errs) errs.forEach((e) => {}dispatch(setAlert(e.msg, 'danger')));
   dispatch({
    type: AUTH_TYPES.LOGIN_FAIL,
   });
  }
 };

//* Logout
export const logout = () => async (dispatch: AuthDispatch) => {
 dispatch({ type: AUTH_TYPES.LOGOUT });
};
