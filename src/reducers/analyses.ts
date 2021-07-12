import { ANALYSE_TYPES } from '../actions/types';
import { IError } from '../general/Common';

export interface IAnalyseType {
 id: string;
 nom: string;
 description: string;
}

export interface IAnalyse {
 id: string;
 type: IAnalyseType;
}

export interface IAnalyseAction {
 type: ANALYSE_TYPES;
 payload?: IError | IAnalyseType[] | IAnalyse[];
}

export type AnalyseState = {
 loading: boolean;
 error: IError | null;
 types: IAnalyseType[];
 analyses: IAnalyse[];
};

const initialState: AnalyseState = {
 loading: true,
 error: null,
 types: [],
 analyses: [],
};

export default function analysesReducer(
 state = initialState,
 action: IAnalyseAction
): AnalyseState {
 const { type, payload } = action;
 switch (type) {
  case ANALYSE_TYPES.GET_TYPES:
   return {
    ...state,
    types: payload as IAnalyseType[],
    loading: false,
    error: null,
   };
  case ANALYSE_TYPES.ADD_TYPE:
   return {
    ...state,
    loading: false,
    error: null,
    types: payload as IAnalyseType[],
   };
  case ANALYSE_TYPES.GET_TYPES_ERROR:
  case ANALYSE_TYPES.ADD_TYPE_ERROR:
   return {
    ...state,
    loading: false,
    error: payload as IError,
   };
  default:
   return state;
 }
}
