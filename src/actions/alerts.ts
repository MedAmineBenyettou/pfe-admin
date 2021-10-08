import { ALERT_TYPES } from './types';
import { AlertTypes, IAlertAction } from '../reducers/alerts';
import { v4 } from 'uuid';
import { ThunkDispatch } from 'redux-thunk';
import { getLangMessage } from './lang';
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
   var t = getLangMessage(msg, true)(dispatch, getState);
   dispatch({
    type: ALERT_TYPES.SET_ALERT,
    payload: {
     msg: withTranslation && t.length > 0 ? t : msg,
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
