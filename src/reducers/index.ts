import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts';
import profile from './profile';

export default combineReducers({ auth, alerts, profile });
