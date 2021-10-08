import { ALERT_TYPES } from './types';
import { AlertTypes, IAlertAction } from '../reducers/alerts';
import { v4 } from 'uuid';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../store';

export const setAlert =
 (
  msg: string | number,
  alertType: AlertTypes,
  withTranslation: boolean = true
 ) =>
 (dispatch: ThunkDispatch<{}, {}, IAlertAction>, getState: () => AppState) => {
  if (
   msg &&
   ((typeof msg === 'string' && msg.length > 0) || typeof msg === 'number')
  ) {
   const id = v4();
   var t = getState().lang.lang.alerts.find((m) => m.code.match(String(msg)));
   var t2 = msg;
   if (!t) t2 = msg;
   else t2 = t.message;
   dispatch({
    type: ALERT_TYPES.SET_ALERT,
    payload: {
     msg: withTranslation ? t2 : msg,
     alertType,
     id,
    },
   });
   setTimeout(
    () => dispatch({ type: ALERT_TYPES.REMOVE_ALERT, payload: id }),
    3500
   );
  }
 };
