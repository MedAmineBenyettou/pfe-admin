import { ALERT_TYPES } from './types';
import { AlertTypes, IAlertAction } from '../reducers/alerts';
import uuid from 'uuid';
import { ThunkDispatch } from 'redux-thunk';

export const setAlert =
 (msg: string, alertType: AlertTypes) =>
 (dispatch: ThunkDispatch<{}, {}, IAlertAction>) => {
  const id = uuid.v4();
  dispatch({
   type: ALERT_TYPES.SET_ALERT,
   payload: { msg, alertType, id },
  });

  setTimeout(
   () => dispatch({ type: ALERT_TYPES.REMOVE_ALERT, payload: id }),
   5000
  );
 };
