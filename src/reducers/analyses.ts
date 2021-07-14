import { ANALYSES } from '../actions/types';
import { IError } from '../general/Common';

export interface IGene {
 id: string;
 nom: string;
 description?: string;
}

export interface IAnalyseType {
 id: string;
 nom: string;
 genes: [IGene];
 description?: string;
}

export interface IAnalyse {
 id: string;
 type: IAnalyseType;
}

export interface IAnalyseAction {
 type: ANALYSES;
 payload?: IError | IAnalyseType[] | IAnalyse[] | IGene[];
}

export type AnalyseState = {
 loading: boolean;
 error: IError | null;
 types: IAnalyseType[];
 genes: IGene[];
 analyses: IAnalyse[];
};

const initialState: AnalyseState = {
 loading: true,
 error: null,
 types: [],
 genes: [],
 analyses: [],
};

export default function analysesReducer(
 state = initialState,
 action: IAnalyseAction
): AnalyseState {
 const { type, payload } = action;
 switch (type) {
  case ANALYSES.GET_TYPES:
   return {
    ...state,
    types: payload as IAnalyseType[],
    loading: false,
    error: null,
   };
  case ANALYSES.ADD_TYPE:
   return {
    ...state,
    loading: false,
    error: null,
    types: payload as IAnalyseType[],
   };
  case ANALYSES.GET_GENES:
   return {
    ...state,
    genes: payload as IGene[],
    loading: false,
    error: null,
   };
  case ANALYSES.ADD_GENE:
   return {
    ...state,
    loading: false,
    error: null,
    genes: payload as IGene[],
   };
  case ANALYSES.GET_TYPES_ERROR:
  case ANALYSES.ADD_TYPE_ERROR:
  case ANALYSES.ADD_GENE_ERROR:
  case ANALYSES.GET_GENES_ERROR:
   return {
    ...state,
    loading: false,
    error: payload as IError,
   };
  default:
   return state;
 }
}
