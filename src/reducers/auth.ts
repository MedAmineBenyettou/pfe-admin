import { AUTH_TYPES, PROFILE_TYPES } from '../actions/types';
import { IError } from '../general/Common';

export interface IUser {
 _id: string;
 username: string;
 isEnabled: boolean;
 date: Date;
}
interface IAuthState {
 user: IUser | null;
 loading: boolean;
 isAuthenticated: boolean | null;
 token: string | null;
 error: IError | null;
}

export interface IAuthAction {
 type: AUTH_TYPES | PROFILE_TYPES;
 payload?: Partial<IAuthState>;
}

const initialState: IAuthState = {
 user: null,
 loading: true,
 isAuthenticated: null,
 token: localStorage.getItem('token'),
 error: null,
};

export default function authReducer(
 state = initialState,
 action: IAuthAction
): IAuthState {
 const { type, payload } = action;
 switch (type) {
  case AUTH_TYPES.LOGIN_FAIL:
  case AUTH_TYPES.AUTH_ERROR:
  case AUTH_TYPES.LOGOUT:
  case AUTH_TYPES.ACCOUNT_DELETED:
  case PROFILE_TYPES.PROFILE_CREATION_FAIL:
   localStorage.removeItem('token');
   return {
    ...state,
    user: null,
    token: null,
    loading: false,
    isAuthenticated: false,
    ...payload,
   };
  case AUTH_TYPES.REGISTER_FAIL:
   return { ...state, error: payload as IError };
  case AUTH_TYPES.LOGIN_SUCCESS:
   if (payload?.token) localStorage.setItem('token', payload.token);
   return {
    ...state,
    ...payload,
    loading: false,
    isAuthenticated: true,
    error: null,
   };
  case AUTH_TYPES.USER_LOADED:
  case AUTH_TYPES.USER_UPDATED:
   return {
    ...state,
    loading: false,
    isAuthenticated: true,
    error: null,
    user: payload as IUser,
   };
  default:
   return state;
 }
}
