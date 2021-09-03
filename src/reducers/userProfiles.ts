import { USER_AUTH_TYPES, USER_PROFILE_TYPES } from '../actions/types';
import { IError } from '../general/Common';

export interface IUser {
 _id: string;
 email: string;
 isEnabled: boolean;
 date: Date;
}

export interface IUserProfile {
 _id: string;
 user: IUser;
 nom: string;
 prenom: string;
 dateOfBirth: Date;
 birthLocation: string;
 adresse: string;
 phoneNumber: string;
 date: Date;
}

export interface IUserProfileState {
 userProfiles: IUserProfile[];
 targetUserProfile: {
  userProfile: IUserProfile | null;
  loading: boolean;
  error: IError | null;
 };
 loading: boolean;
 error: IError | null;
}

export interface IUserProfileAction {
 type: USER_PROFILE_TYPES | USER_AUTH_TYPES;
 payload?: IUserProfile | IUserProfile[] | IError | null;
}

const initialState: IUserProfileState = {
 userProfiles: [],
 targetUserProfile: {
  userProfile: null,
  loading: false,
  error: null,
 },
 loading: true,
 error: null,
};

export default function profileReducer(
 state = initialState,
 action: IUserProfileAction
): IUserProfileState {
 const { type, payload } = action;
 switch (type) {
  case USER_PROFILE_TYPES.GET_USER_PROFILE:
  case USER_PROFILE_TYPES.USER_PROFILE_CREATION_SUCCESS:
   return {
    ...state,
    loading: false,
    error: null,
    targetUserProfile: {
     userProfile: payload as IUserProfile,
     loading: false,
     error: null,
    },
   };
  case USER_PROFILE_TYPES.USER_PROFILE_UPDATE_SUCCESS:
   return {
    ...state,
    targetUserProfile: {
     userProfile: payload as IUserProfile,
     loading: false,
     error: null,
    },
    loading: false,
    error: null,
   };
  case USER_PROFILE_TYPES.USER_PROFILE_ERROR:
  case USER_PROFILE_TYPES.USER_PROFILE_CREATION_FAIL:
   return {
    ...state,
    userProfiles: [],
    targetUserProfile: {
     loading: false,
     userProfile: null,
     error: null,
    },
    error: payload as IError,
    loading: false,
   };
  case USER_PROFILE_TYPES.CLEAR_USER_PROFILE:
   return {
    ...state,
    loading: false,
    targetUserProfile: {
     loading: false,
     userProfile: null,
     error: null,
    },
    error: null,
   };
  case USER_PROFILE_TYPES.USER_PROFILE_UPDATE_FAIL:
   return {
    ...state,
    error: payload as IError,
    loading: false,
   };
  case USER_PROFILE_TYPES.ERROR_GETTING_USER_PROFILES:
   return {
    ...state,
    userProfiles: [],
    error: payload as IError,
   };
  case USER_PROFILE_TYPES.GETTING_USER_PROFILES:
   return {
    ...state,
    userProfiles: [],
    loading: true,
   };
  case USER_PROFILE_TYPES.GETTING_USER_PROFILES_SUCCESS:
   return {
    ...state,
    userProfiles: payload as IUserProfile[],
    loading: false,
    error: null,
   };
  case USER_PROFILE_TYPES.GETTING_TARGET_USER_PROFILE:
   return {
    ...state,
    targetUserProfile: {
     ...state.targetUserProfile,
     loading: true,
     error: null,
    },
   };
  case USER_PROFILE_TYPES.GETTING_TARGET_USER_PROFILE_SUCCESS:
  case USER_PROFILE_TYPES.SETTING_TARGET_USER_PROFILE:
   return {
    ...state,
    targetUserProfile: {
     ...state.targetUserProfile,
     userProfile: payload as IUserProfile,
     loading: false,
     error: null,
    },
   };
  case USER_PROFILE_TYPES.ERROR_GETTING_TARGET_USER_PROFILE:
   return {
    ...state,
    targetUserProfile: {
     ...state.targetUserProfile,
     userProfile: null,
     loading: false,
     error: payload as IError,
    },
   };

  default:
   return state;
 }
}
