import moment from 'moment';
import { ANALYSES_TYPES } from '../actions/types';
import { IError } from '../general/Common';
import { IProfile } from './profile';
import { IUserProfile } from './userProfiles';

export interface IGene {
 _id: string;
 nom: string;
 description?: string;
}

export interface IAnalyseType {
 _id: string;
 nom: string;
 genes: IGene[];
 description?: string;
}

export interface IAnalyse {
 _id: string;
 patient: IUserProfile;
 user: IProfile;
 type: IAnalyseType;
 locationDePrelevement: string;
 etat: number;
 positive: boolean;
 description?: string;
 notes?: string;
 date: Date;
}

interface IResponse<T> {
 data: T;
 params: {
  totalPages: number;
  totalDocs: number;
  limit: number;
  nextPage: number | null;
  prevPage: number | null;
  page: number;
 } | null;
}

export interface IAnalyseAction {
 type: ANALYSES_TYPES;
 payload?:
  | IError
  | IAnalyseType[]
  | IAnalyse[]
  | IGene[]
  | IAnalyseType
  | IGene
  | IAnalyse
  | IResponse<IAnalyse[]>;
}

export type AnalyseState = {
 loading: boolean;
 error: IError | null;
 types: IAnalyseType[];
 genes: IGene[];
 analyses: IResponse<IAnalyse[]>;
 selection: {
  type: IAnalyseType | null;
  gene: IGene | null;
  analyse: IAnalyse | null;
 };
};

const initialState: AnalyseState = {
 loading: true,
 error: null,
 types: [],
 genes: [],
 analyses: {
  data: [],
  params: null,
 },
 selection: {
  type: null,
  gene: null,
  analyse: null,
 },
};

export default function analysesReducer(
 state = initialState,
 action: IAnalyseAction
): AnalyseState {
 const { type, payload } = action;
 switch (type) {
  case ANALYSES_TYPES.GET_ANALYSES:
  case ANALYSES_TYPES.ADD_ANALYSE:
  case ANALYSES_TYPES.UPDATE_ANALYSE:
  case ANALYSES_TYPES.DELETE_ANALYSE:
   return {
    ...state,
    loading: false,
    error: null,
    analyses: payload as IResponse<IAnalyse[]>,
   };
  case ANALYSES_TYPES.SELECT_ANALYSE:
   return {
    ...state,
    selection: {
     ...state.selection,
     analyse: payload as IAnalyse,
    },
   };
  case ANALYSES_TYPES.CLEAR_SELECTED_ANALYSE:
   return {
    ...state,
    selection: {
     ...state.selection,
     analyse: null,
    },
   };
  case ANALYSES_TYPES.GET_TYPES:
  case ANALYSES_TYPES.ADD_TYPE:
  case ANALYSES_TYPES.UPDATE_TYPE:
  case ANALYSES_TYPES.DELETE_TYPE:
   if (!(payload as IAnalyseType[]).length)
    return {
     ...state,
     types: [],
     loading: false,
     error: null,
    };
   return {
    ...state,
    types: payload as IAnalyseType[],
    loading: false,
    error: null,
   };
  case ANALYSES_TYPES.GET_GENES:
  case ANALYSES_TYPES.ADD_GENE:
  case ANALYSES_TYPES.UPDATE_GENE:
  case ANALYSES_TYPES.DELETE_GENE:
   return {
    ...state,
    genes: payload as IGene[],
    loading: false,
    error: null,
   };
  case ANALYSES_TYPES.SELECT_TYPE:
   return {
    ...state,
    selection: {
     ...state.selection,
     type: payload as IAnalyseType,
    },
   };
  case ANALYSES_TYPES.CLEAR_SELECTED_TYPE:
   return {
    ...state,
    selection: {
     ...state.selection,
     type: null,
    },
   };
  case ANALYSES_TYPES.SELECT_GENE:
   return {
    ...state,
    selection: {
     ...state.selection,
     gene: payload as IGene,
    },
   };
  case ANALYSES_TYPES.CLEAR_SELECTED_GENE:
   return {
    ...state,
    selection: {
     ...state.selection,
     gene: null,
    },
   };
  case ANALYSES_TYPES.GET_TYPES_ERROR:
  case ANALYSES_TYPES.ADD_TYPE_ERROR:
  case ANALYSES_TYPES.ADD_GENE_ERROR:
  case ANALYSES_TYPES.GET_GENES_ERROR:
  case ANALYSES_TYPES.UPDATE_GENE_ERROR:
  case ANALYSES_TYPES.DELETE_GENE_ERROR:
  case ANALYSES_TYPES.UPDATE_TYPE_ERROR:
  case ANALYSES_TYPES.DELETE_TYPE_ERROR:
  case ANALYSES_TYPES.GET_ANALYSES_ERROR:
  case ANALYSES_TYPES.ADD_ANALYSE_ERROR:
  case ANALYSES_TYPES.UPDATE_ANALYSE_ERROR:
  case ANALYSES_TYPES.DELETE_ANALYSE_ERROR:
   return {
    ...state,
    loading: false,
    error: payload as IError,
   };
  case ANALYSES_TYPES.LOADING_ANALYSE:
   return {
    ...state,
    loading: true,
   };
  default:
   return state;
 }
}
