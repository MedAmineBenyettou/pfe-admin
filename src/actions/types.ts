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
 USER_UPDATED = 'USER_UPDATED',
 AUTH_ERROR = 'AUTH_ERROR',
 ACCOUNT_DELETED = 'ACCOUNT_DELETED',
}

export enum ALERT_TYPES {
 SET_ALERT = 'SET_ALERT',
 REMOVE_ALERT = 'REMOVE_ALERT',
}

export enum ANALYSES_TYPES {
 //* Types
 GET_TYPES = 'GET_TYPES',
 GET_TYPES_ERROR = 'GET_TYPES_ERROR',
 ADD_TYPE = 'ADD_TYPE',
 ADD_TYPE_ERROR = 'ADD_TYPE_ERROR',
 SELECT_TYPE = 'SELECT_TYPE',
 CLEAR_SELECTED_TYPE = 'CLEAR_SELECTED_TYPE',

 //* Genes
 GET_GENES = 'GET_GENES',
 GET_GENES_ERROR = 'GET_GENES_ERROR',
 ADD_GENE = 'ADD_GENE',
 ADD_GENE_ERROR = 'ADD_GENE_ERROR',
 SELECT_GENE = 'SELECT_GENE',
 CLEAR_SELECTED_GENE = 'CLEAR_SELECTED_GENE',
}

export enum PROFILE_TYPES {
 GET_PROFILE = 'GET_PROFILE',
 PROFILE_ERROR = 'PROFILE_ERROR',
 CLEAR_PROFILE = 'CLEAR_PROFILE',
 PROFILE_CREATION_SUCCESS = 'PROFILE_CREATION_SUCCESS',
 PROFILE_CREATION_FAIL = 'PROFILE_CREATION_FAIL',
 OTHER_PROFILE_CREATION_SUCCESS = 'OTHER_PROFILE_CREATION_SUCCESS',
 OTHER_PROFILE_CREATION_FAIL = 'OTHER_PROFILE_CREATION_FAIL',
 PROFILE_UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS',
 PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL',
 OTHER_PROFILE_UPDATE_SUCCESS = 'OTHER_PROFILE_UPDATE_SUCCESS',
 OTHER_PROFILE_UPDATE_FAIL = 'OTHER_PROFILE_UPDATE_FAIL',
 ACCOUNT_DELETED = 'ACCOUNT_DELETED',
 GETTING_PROFILES = 'GETTING_PROFILES',
 GETTING_PROFILES_SUCCESS = 'GET_PROFILES_SUCCESS',
 ERROR_GETTING_PROFILES = 'ERROR_GETTING_PROFILES',
 SETTING_TARGET_PROFILE = 'SETTING_TARGET_PROFILE',
 GETTING_TARGET_PROFILE = 'GETTING_TARGET_PROFILE',
 ERROR_GETTING_TARGET_PROFILE = 'ERROR_GETTING_TARGET_PROFILE',
 GETTING_TARGET_PROFILE_SUCCESS = 'GETTING_TARGET_PROFILE_SUCCESS',
}
