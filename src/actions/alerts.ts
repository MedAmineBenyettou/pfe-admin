import { ALERT_TYPES } from './types';
import { AlertTypes, IAlertAction } from '../reducers/alerts';
import { v4 } from 'uuid';
import { ThunkDispatch } from 'redux-thunk';

export const setAlert =
 (msg: string, alertType: AlertTypes) =>
 (dispatch: ThunkDispatch<{}, {}, IAlertAction>) => {
  if (msg && typeof msg === 'string' && msg.length > 0) {
   const id = v4();
   dispatch({
    type: ALERT_TYPES.SET_ALERT,
    payload: { msg, alertType, id },
   });

   setTimeout(
    () => dispatch({ type: ALERT_TYPES.REMOVE_ALERT, payload: id }),
    3500
   );
  }
 };
