import { LANG_TYPES } from '../actions/types';
const langs: ILang[] = require('../general/languages.json');

type Dict = { language: string; lang: string };
type LangMessage = { code: string; message: string };

export interface ILang {
 dict: Dict;
 messages: LangMessage[];
 alerts: LangMessage[];
}

export interface ILangAction {
 type: LANG_TYPES;
 payload: string;
}

export type LangState = {
 langs: Dict[];
 lang: ILang;
};

const findLang = (lang: string) => {
 const t = langs.find((l) => l.dict.lang.toLowerCase() === lang.toLowerCase());
 if (t) return t;
 else return langs[0];
};

const initialState: LangState = {
 langs: langs.map((l) => l.dict),
 lang: findLang('en'),
};

export default function LangsReducer(
 state = initialState,
 action: ILangAction
): LangState {
 const { type, payload } = action;
 switch (type) {
  case LANG_TYPES.CHANGE_LANG:
   return { ...state, lang: findLang(payload) };
  default:
   return state;
 }
}
