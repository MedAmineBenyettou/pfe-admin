import { ALERT_TYPES } from '../actions/types';

export enum AlertTypes {
 SUCCESS = 'SUCCESS',
 DANGER = 'DANGER',
 WARNING = 'WARNING',
 INFO = 'INFO',
}
export interface IAlert {
 msg: string;
 alertType: AlertTypes;
 id: string;
}

export interface IAlertAction {
 type: ALERT_TYPES;
 payload?: IAlert | string;
}

export type AlertState = IAlert[];

const initialState: AlertState = [];

export default function alertsReducer(
 state = initialState,
 action: IAlertAction
) {
 const { type, payload } = action;
 switch (type) {
  case ALERT_TYPES.SET_ALERT:
   return [...state, payload];
  case ALERT_TYPES.REMOVE_ALERT:
   return state.filter((a) => a.id !== payload);
  default:
   return state;
 }
}
