import { AUTH_TYPES, PROFILE_TYPES } from '../actions/types';
import { IError } from '../general/Common';

export interface IProfile {}

export interface IProfileState {
 profile: IProfile | null;
 profiles: {
  error: IError | null;
  profiles: IProfile[];
  loading: boolean;
 };
 targetProfile: {
  profile: IProfile | null;
  loading: boolean;
  error: IError | null;
 };
 loading: boolean;
 error: IError;
}

export interface IProfileAction {
 type: PROFILE_TYPES | AUTH_TYPES;
 payload?: IProfile | IError;
}

const initialState = {
 profile: null,
 profiles: {
  error: null,
  profiles: [],
  loading: false,
 },
 targetProfile: {
  profile: null,
  loading: false,
  error: null,
 },
 loading: true,
 error: {},
};

export default function profileReducer(
 state = initialState,
 action: IProfileAction
) {
 const { type, payload } = action;
 switch (type) {
  case PROFILE_TYPES.GET_PROFILE:
  case PROFILE_TYPES.PROFILE_CREATION_SUCCESS:
   return {
    ...state,
    profile: payload,
    loading: false,
    error: [],
   };
  case PROFILE_TYPES.PROFILE_UPDATE_SUCCESS:
   return {
    ...state,
    profile: payload,
    targetProfile: {
     ...state.targetProfile,
     profile: payload,
     loading: false,
    },
    loading: false,
    error: [],
   };
  case PROFILE_TYPES.PROFILE_ERROR:
  case PROFILE_TYPES.PROFILE_CREATION_FAIL:
   return {
    ...state,
    profile: null,
    profiles: {
     error: null,
     profiles: [],
     loading: false,
    },
    targetProfile: {
     loading: false,
     profile: null,
     error: null,
    },
    error: payload,
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
    profiles: {
     error: null,
     profiles: [],
     loading: false,
    },
    error: [],
   };
  case PROFILE_TYPES.PROFILE_UPDATE_FAIL:
   return {
    ...state,
    error: payload,
    loading: false,
   };
  case PROFILE_TYPES.ERROR_GETTING_PROFILES:
   return {
    ...state,
    profiles: { error: payload, loading: false },
   };
  case PROFILE_TYPES.GETTING_PROFILES:
   return {
    ...state,
    profiles: { loading: true },
   };
  case PROFILE_TYPES.GETTING_PROFILES_SUCCESS:
   return {
    ...state,
    profiles: { ...payload, loading: false },
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
     profile: payload,
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
     error: payload,
    },
   };
  }
  default:
   return state;
 }
}
