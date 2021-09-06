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
 async (dispatch: ThunkDispatch<{}, {}, IUserProfileAction>) => {
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
   dispatch(setAlert('Utilisateur enregistré avec succès', AlertTypes.SUCCESS));
   dispatch(getAllUsersProfiles());
  } catch (err: any) {
   const errs = err.response ? err.response.data.errors : [err];
   if (errs)
    errs.forEach((e: any) => {
     dispatch(setAlert(e.msg, AlertTypes.DANGER));
    });
   console.error(err);
   dispatch({
    type: USER_AUTH_TYPES.USER_REGISTER_FAIL,
    payload: err,
   });
  }
 };
