import { AUTH_TYPES, PROFILE_TYPES } from '../actions/types';
import { IError } from '../general/Common';

export interface IProfile {
 _id: string;
 user: {
  username: string;
 };
 nom: string;
 prenom: string;
 fonction: string;
 phoneNumber: string;
 date: Date;
}

export interface IProfileState {
 profile: IProfile | null;
 profiles: IProfile[];
 targetProfile: {
  profile: IProfile | null;
  loading: boolean;
  error: IError | null;
 };
 loading: boolean;
 error: IError | null;
}

export interface IProfileAction {
 type: PROFILE_TYPES | AUTH_TYPES;
 payload?: IProfile | IProfile[] | IError | null;
}

const initialState: IProfileState = {
 profile: null,
 profiles: [],
 targetProfile: {
  profile: null,
  loading: false,
  error: null,
 },
 loading: true,
 error: null,
};

export default function profileReducer(
 state = initialState,
 action: IProfileAction
): IProfileState {
 const { type, payload } = action;
 switch (type) {
  case PROFILE_TYPES.GET_PROFILE:
  case PROFILE_TYPES.PROFILE_CREATION_SUCCESS:
   return {
    ...state,
    profile: payload as IProfile,
    loading: false,
    error: null,
   };
  case PROFILE_TYPES.PROFILE_UPDATE_SUCCESS:
   return {
    ...state,
    profile: payload as IProfile,
    targetProfile: {
     ...state.targetProfile,
     profile: payload as IProfile,
     loading: false,
    },
    loading: false,
    error: null,
   };
  case PROFILE_TYPES.PROFILE_ERROR:
  case PROFILE_TYPES.PROFILE_CREATION_FAIL:
   return {
    ...state,
    profile: null,
    profiles: [],
    targetProfile: {
     loading: false,
     profile: null,
     error: null,
    },
    error: payload as IError,
    loading: false,
   };
  case AUTH_TYPES.LOGOUT:
  case PROFILE_TYPES.CLEAR_PROFILE:
   return {
    ...state,
    profile: null,
    loading: false,
    targetProfile: {
     loading: false,
     profile: null,
     error: null,
    },
    profiles: [],
    error: null,
   };
  case PROFILE_TYPES.PROFILE_UPDATE_FAIL:
   return {
    ...state,
    error: payload as IError,
    loading: false,
   };
  case PROFILE_TYPES.ERROR_GETTING_PROFILES:
   return {
    ...state,
    profiles: [],
    error: payload as IError,
   };
  case PROFILE_TYPES.GETTING_PROFILES:
   return {
    ...state,
    profiles: [],
    loading: true,
   };
  case PROFILE_TYPES.GETTING_PROFILES_SUCCESS:
  case PROFILE_TYPES.OTHER_PROFILE_UPDATE_SUCCESS:
  case PROFILE_TYPES.OTHER_PROFILE_CREATION_SUCCESS:
   return {
    ...state,
    profiles: payload as IProfile[],
    loading: false,
    error: null,
   };
  case PROFILE_TYPES.GETTING_TARGET_PROFILE:
   return {
    ...state,
    targetProfile: {
     ...state.targetProfile,
     loading: true,
     error: null,
    },
   };
  case PROFILE_TYPES.GETTING_TARGET_PROFILE_SUCCESS:
  case PROFILE_TYPES.SETTING_TARGET_PROFILE:
   return {
    ...state,
    targetProfile: {
     ...state.targetProfile,
     profile: payload as IProfile,
     loading: false,
     error: null,
    },
   };
  case PROFILE_TYPES.ERROR_GETTING_TARGET_PROFILE: {
   return {
    ...state,
    targetProfile: {
     ...state.targetProfile,
     profile: null,
     loading: false,
     error: payload as IError,
    },
   };
  }
  case PROFILE_TYPES.OTHER_PROFILE_UPDATE_FAIL:
   return {
    ...state,
    targetProfile: {
     ...state.targetProfile,
     loading: false,
     error: payload as IError,
    },
   };
  default:
   return state;
 }
}
