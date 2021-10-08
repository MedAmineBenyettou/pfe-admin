import { USER_AUTH_TYPES } from './types';
import axios from 'axios';
import { setAlert } from './alerts';
import { AlertTypes } from '../reducers/alerts';
import {
 IUserProfileAction,
 IUser,
 IUserProfile,
} from '../reducers/userProfiles';
import { ThunkDispatch } from 'redux-thunk';
// import { getCurrentProfile, createProfileById } from './profile';
import { CONFIG } from '../general/Common';
import { getAllUsersProfiles } from './userProfiles';
import { AppState } from '../store';

//* Register User
interface IRegisterUserForm
 extends Omit<IUserProfile, '_id' | 'user' | 'date'>,
  Omit<IUser, '_id' | 'isEnabled' | 'date'> {
 password: string;
}
export const registerUser =
 ({
  email,
  password,
  adresse,
  birthLocation,
  dateOfBirth,
  nom,
  phoneNumber,
  prenom,
 }: IRegisterUserForm) =>
 async (
  dispatch: ThunkDispatch<{}, {}, IUserProfileAction>,
  getState: () => AppState
 ) => {
  const body = JSON.stringify({
   email,
   password,
   adresse,
   birthLocation,
   dateOfBirth,
   nom,
   phoneNumber,
   prenom,
  });
  try {
   await axios.post('/api/users', body, CONFIG);
   dispatch({
    type: USER_AUTH_TYPES.USER_REGISTER_SUCCESS,
   });
   setAlert('200-1', AlertTypes.SUCCESS)(dispatch, getState);
   getAllUsersProfiles()(dispatch, getState);
  } catch (err: any) {
   const errs = err.response ? err.response.data.errors : [err];
   if (errs)
    errs.forEach((e: any) => {
     setAlert(e.msg, AlertTypes.DANGER)(dispatch, getState);
    });
   console.error(err);
   dispatch({
    type: USER_AUTH_TYPES.USER_REGISTER_FAIL,
    payload: err,
   });
  }
 };
