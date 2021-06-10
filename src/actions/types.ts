export enum AUTH_TYPES {
 //? REGISTER
 REGISTER_SUCCESS = 'REGISTER_SUCCESS',
 REGISTER_FAIL = 'REGISTER_FAIL',

 //? LOGIN
 LOGIN_SUCCESS = 'LOGIN_SUCCESS',
 LOGIN_FAIL = 'LOGIN_FAIL',
 LOGOUT = 'LOGOUT',

 //? AUTH
 USER_LOADED = 'USER_LOADED',
 AUTH_ERROR = 'AUTH_ERROR',
 ACCOUNT_DELETED = 'ACCOUNT_DELETED',
}

export enum ALERT_TYPES {
 SET_ALERT = 'SET_ALERT',
 REMOVE_ALERT = 'REMOVE_ALERT',
}

export enum PROFILE_TYPES {
 GET_PROFILE = 'GET_PROFILE',
 PROFILE_ERROR = 'PROFILE_ERROR',
 CLEAR_PROFILE = 'CLEAR_PROFILE',
 PROFILE_CREATION_SUCCESS = 'PROFILE_CREATION_SUCCESS',
 PROFILE_CREATION_FAIL = 'PROFILE_CREATION_FAIL',
 PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS',
 PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL',
 ACCOUNT_DELETED = 'ACCOUNT_DELETED',
 GETTING_PROFILES = 'GETTING_PROFILES',
 GETTING_PROFILES_SUCCESS = 'GET_PROFILES_SUCCESS',
 ERROR_GETTING_PROFILES = 'ERROR_GETTING_PROFILES',
 SETTING_TARGET_PROFILE = 'SETTING_TARGET_PROFILE',
 GETTING_TARGET_PROFILE = 'GETTING_TARGET_PROFILE',
 ERROR_GETTING_TARGET_PROFILE = 'ERROR_GETTING_TARGET_PROFILE',
 GETTING_TARGET_PROFILE_SUCCESS = 'GETTING_TARGET_PROFILE_SUCCESS',
}