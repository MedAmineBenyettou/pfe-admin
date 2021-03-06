export enum AUTH_TYPES {
 //? REGISTER
 REGISTER_SUCCESS = 'REGISTER_SUCCESS',
 REGISTER_FAIL = 'REGISTER_FAIL',

 //? LOGIN
 LOGIN_SUCCESS = 'LOGIN_SUCCESS',
 LOGIN_FAIL = 'LOGIN_FAIL',
 LOGOUT = 'LOGOUT',

 //? AUTH
 LOADING_USER = 'LOADING_USER',
 USER_LOADED = 'USER_LOADED',
 USER_UPDATED = 'USER_UPDATED',
 AUTH_ERROR = 'AUTH_ERROR',
 ACCOUNT_DELETED = 'ACCOUNT_DELETED',
}

export enum USER_AUTH_TYPES {
 //? REGISTER
 USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS',
 USER_REGISTER_FAIL = 'USER_REGISTER_FAIL',

 //? UPDATE
 USER_USER_UPDATED = 'USER_USER_UPDATED',
 USER_ACCOUNT_DELETED = 'USER_ACCOUNT_DELETED',
}

export enum ALERT_TYPES {
 SET_ALERT = 'SET_ALERT',
 REMOVE_ALERT = 'REMOVE_ALERT',
}

export enum ANALYSES_TYPES {
 //* Analyses
 GET_ANALYSES = 'GET_ANALYSES',
 GET_ANALYSES_ERROR = 'GET_ANALYSES_ERROR',
 ADD_ANALYSE = 'ADD_ANALYSE',
 ADD_ANALYSE_ERROR = 'ADD_ANALYSE_ERROR',
 UPDATE_ANALYSE = 'UPDATE_ANALYSE',
 UPDATE_ANALYSE_ERROR = 'UPDATE_ANALYSE_ERROR',
 DELETE_ANALYSE = 'DELETE_ANALYSE',
 DELETE_ANALYSE_ERROR = 'DELETE_ANALYSE_ERROR',
 SELECT_ANALYSE = 'SELECT_ANALYSE',
 CLEAR_SELECTED_ANALYSE = 'CLEAR_SELECTED_ANALYSE',

 //* Types
 GET_TYPES = 'GET_TYPES',
 GET_TYPES_ERROR = 'GET_TYPES_ERROR',
 ADD_TYPE = 'ADD_TYPE',
 ADD_TYPE_ERROR = 'ADD_TYPE_ERROR',
 UPDATE_TYPE = 'UPDATE_TYPE',
 UPDATE_TYPE_ERROR = 'UPDATE_TYPE_ERROR',
 DELETE_TYPE = 'DELETE_TYPE',
 DELETE_TYPE_ERROR = 'DELETE_TYPE_ERROR',
 SELECT_TYPE = 'SELECT_TYPE',
 CLEAR_SELECTED_TYPE = 'CLEAR_SELECTED_TYPE',

 //* Genes
 GET_GENES = 'GET_GENES',
 GET_GENES_ERROR = 'GET_GENES_ERROR',
 ADD_GENE = 'ADD_GENE',
 ADD_GENE_ERROR = 'ADD_GENE_ERROR',
 UPDATE_GENE = 'UPDATE_GENE',
 UPDATE_GENE_ERROR = 'UPDATE_GENE_ERROR',
 DELETE_GENE = 'DELETE_GENE',
 DELETE_GENE_ERROR = 'DELETE_GENE_ERROR',
 SELECT_GENE = 'SELECT_GENE',
 CLEAR_SELECTED_GENE = 'CLEAR_SELECTED_GENE',

 LOADING_ANALYSE = 'LOADING_ANALYSE',
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
 GETTING_PROFILES = 'GETTING_PROFILES',
 GETTING_PROFILES_SUCCESS = 'GET_PROFILES_SUCCESS',
 ERROR_GETTING_PROFILES = 'ERROR_GETTING_PROFILES',
 SETTING_TARGET_PROFILE = 'SETTING_TARGET_PROFILE',
 GETTING_TARGET_PROFILE = 'GETTING_TARGET_PROFILE',
 ERROR_GETTING_TARGET_PROFILE = 'ERROR_GETTING_TARGET_PROFILE',
 GETTING_TARGET_PROFILE_SUCCESS = 'GETTING_TARGET_PROFILE_SUCCESS',
}

export enum USER_PROFILE_TYPES {
 GET_USER_PROFILE = 'GET_USER_PROFILE',
 USER_PROFILE_ERROR = 'USER_PROFILE_ERROR',
 CLEAR_USER_PROFILE = 'CLEAR_USER_PROFILE',
 USER_PROFILE_CREATION_SUCCESS = 'USER_PROFILE_CREATION_SUCCESS',
 USER_PROFILE_CREATION_FAIL = 'USER_PROFILE_CREATION_FAIL',
 USER_PROFILE_UPDATE_SUCCESS = 'USER_PROFILE_UPDATE_SUCCESS',
 USER_PROFILE_UPDATE_FAIL = 'USER_PROFILE_UPDATE_FAIL',
 GETTING_USER_PROFILES = 'GETTING_USER_PROFILES',
 GETTING_USER_PROFILES_SUCCESS = 'GETTING_USER_PROFILES_SUCCESS',
 ERROR_GETTING_USER_PROFILES = 'ERROR_GETTING_USER_PROFILES',
 SETTING_TARGET_USER_PROFILE = 'SETTING_TARGET_USER_PROFILE',
 GETTING_TARGET_USER_PROFILE = 'GETTING_TARGET_USER_PROFILE',
 ERROR_GETTING_TARGET_USER_PROFILE = 'ERROR_GETTING_TARGET_USER_PROFILE',
 GETTING_TARGET_USER_PROFILE_SUCCESS = 'GETTING_TARGET_USER_PROFILE_SUCCESS',
}

export enum LANG_TYPES {
 CHANGE_LANG = 'CHANGE_LANG',
}
