import { ALERT_TYPES } from './types';
import { AlertTypes, IAlertAction } from '../reducers/alerts';
import { Dispatch } from 'redux';
import uuid from 'uuid';

type AlertDispatch = Dispatch<IAlertAction | any>;

export const setAlert =
 (msg: string, alertType: AlertTypes) => (dispatch: AlertDispatch) => {
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
