import { LANG_TYPES } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { ILangAction } from '../reducers/lang';

export const setLang =
 (lang: string) => (dispatch: ThunkDispatch<{}, {}, ILangAction>) => {
  dispatch({
   type: LANG_TYPES.CHANGE_LANG,
   payload: lang,
  });
 };
