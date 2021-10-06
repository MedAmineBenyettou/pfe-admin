import { LANG_TYPES } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { ILang, ILangAction } from '../reducers/lang';
import { setAlert } from './alerts';
import { AlertTypes } from '../reducers/alerts';

const langs: ILang[] = require('../general/languages.json');

const langExists = (lang: string) => {
 return langs.filter((l) => l.dict.lang.match(lang)).length > 0;
};

export const setLang =
 (lang: string) => (dispatch: ThunkDispatch<{}, {}, ILangAction>) => {
  if (langExists(lang))
   dispatch({
    type: LANG_TYPES.CHANGE_LANG,
    payload: lang,
   });
  else dispatch(setAlert('Language not found', AlertTypes.WARNING));
 };
