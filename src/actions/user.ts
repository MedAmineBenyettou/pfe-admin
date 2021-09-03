import { USER_AUTH_TYPES } from './types';
import axios from 'axios';
import { setAlert } from './alerts';
import setAuthToken from '../general/setAuthToken';
import { AlertTypes } from '../reducers/alerts';
import { IUserProfileAction, IUser } from '../reducers/userProfiles';
import { ThunkDispatch } from 'redux-thunk';
import { getCurrentProfile, createProfileById } from './profile';
import { CONFIG } from '../general/Common';

//* Register User
interface IRegisterUserForm {
 email: string;
 password: string;
}
export const register =
 ({ email, password }: IRegisterUserForm) =>
 async (dispatch: ThunkDispatch<{}, {}, IUserProfileAction>) => {
  const body = JSON.stringify({ password, email });
  try {
   const res = await axios.post('/api/admin/admins', body, CONFIG);
   dispatch({
    type: USER_AUTH_TYPES.USER_REGISTER_SUCCESS,
   });
   const user = res.data.find((p: IUser) => p.email === email);
   dispatch(createProfileById(user._id));
   dispatch(setAlert('Utilisateur enregistré avec succès', AlertTypes.SUCCESS));
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
