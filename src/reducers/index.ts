import { combineReducers } from 'redux';
import auth from './auth';
import alerts from './alerts';
import profile from './profile';
import userProfile from './userProfiles';
import analyses from './analyses';

export default combineReducers({
 auth,
 alerts,
 profile,
 analyses,
 userProfile,
});
