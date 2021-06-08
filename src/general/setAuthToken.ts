import axios from 'axios';

const setAuthToken = (token: string) => {
 if (token) {
  axios.defaults.headers.common['x-admin-auth-token'] = token;
 } else {
  delete axios.defaults.headers.common['x-admin-auth-token'];
 }
};

export default setAuthToken;
