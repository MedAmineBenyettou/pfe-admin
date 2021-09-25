import { ANALYSES_TYPES } from './types';
import { ThunkDispatch } from 'redux-thunk';
import {
 IAnalyse,
 IAnalyseAction,
 IAnalyseType,
 IGene,
} from '../reducers/analyses';
import axios from 'axios';
import { CONFIG } from '../general/Common';
import { setAlert } from './alerts';
import { AlertTypes } from '../reducers/alerts';

//! ANALYSES ------------------------------------------------------

export type AnalyseStateForm = Omit<
 IAnalyse,
 '_id' | 'user' | 'type' | 'patient' | 'date'
> & {
 type: string;
 patient: string;
};

export const getAnalyses =
 (options?: { page: number }) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.LOADING_ANALYSE,
  });
  try {
   const res = await axios.get('/api/analyse', {
    params: options,
   });
   dispatch({
    type: ANALYSES_TYPES.GET_ANALYSES,
    payload: res.data,
   });
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.GET_ANALYSES_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const addAnalyse =
 (form: Partial<AnalyseStateForm>) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.post('/api/analyse', form, CONFIG);
   dispatch({
    type: ANALYSES_TYPES.ADD_ANALYSE,
    payload: res.data,
   });
   dispatch(setAlert(`Analyse ajoutée avec succès`, AlertTypes.SUCCESS));
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.ADD_ANALYSE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const updateAnalyseById =
 (id: string, type: Partial<AnalyseStateForm>) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.put(`/api/analyse/${id}`, type, CONFIG);
   dispatch({
    type: ANALYSES_TYPES.UPDATE_ANALYSE,
    payload: res.data,
   });
   dispatch(setAlert(`Analyse modifiée avec succès`, AlertTypes.SUCCESS));
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.UPDATE_ANALYSE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const deleteAnalyseById =
 (id: string) => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.LOADING_ANALYSE,
  });
  try {
   const res = await axios.delete(`/api/analyse/${id}`);
   dispatch({
    type: ANALYSES_TYPES.DELETE_ANALYSE,
    payload: res.data,
   });
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.DELETE_ANALYSE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const selectAnalyse =
 (type: IAnalyse) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.SELECT_ANALYSE,
   payload: type,
  });
 };

export const clearSelectedAnalyse =
 () => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.CLEAR_SELECTED_ANALYSE,
  });
 };

//! ANALYSE TYPES ------------------------------------------------------

export const getAnalyseTypes =
 () => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.LOADING_ANALYSE,
  });
  try {
   const res = await axios.get('/api/analyseTypes');
   dispatch({
    type: ANALYSES_TYPES.GET_TYPES,
    payload: res.data,
   });
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.GET_TYPES_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const addAnalyseTypes =
 (type: Pick<IAnalyseType, 'nom' | 'description' | 'genes'>) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.post('/api/analyseTypes', type, CONFIG);
   dispatch({
    type: ANALYSES_TYPES.ADD_TYPE,
    payload: res.data,
   });
   dispatch(
    setAlert(
     `Type d'analyse "${type.nom}" ajouté avec succès`,
     AlertTypes.SUCCESS
    )
   );
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.ADD_TYPE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const updateAnalyseTypeById =
 (
  id: string,
  type: Partial<Pick<IAnalyseType, 'nom' | 'description' | 'genes'>>
 ) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.put(`/api/analyseTypes/${id}`, type, CONFIG);
   dispatch({
    type: ANALYSES_TYPES.UPDATE_TYPE,
    payload: res.data,
   });
   dispatch(
    setAlert(
     `Type d'analyse "${type.nom}" modifié avec succès`,
     AlertTypes.SUCCESS
    )
   );
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.UPDATE_TYPE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const deleteTypeById =
 (id: string) => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.LOADING_ANALYSE,
  });
  try {
   const res = await axios.delete(`/api/analyseTypes/${id}`);
   dispatch({
    type: ANALYSES_TYPES.DELETE_TYPE,
    payload: res.data,
   });
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.DELETE_TYPE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const selectType =
 (type: IAnalyseType) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.SELECT_TYPE,
   payload: type,
  });
 };

export const clearSelectedType =
 () => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.CLEAR_SELECTED_TYPE,
  });
 };

//! GENES  ------------------------------------------------------------

export const getGenes =
 () => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.LOADING_ANALYSE,
  });
  try {
   const res = await axios.get('/api/admin/genes');
   dispatch({
    type: ANALYSES_TYPES.GET_GENES,
    payload: res.data,
   });
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.GET_GENES_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const deleteGeneById =
 (id: string) => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.LOADING_ANALYSE,
  });
  try {
   const res = await axios.delete(`/api/admin/genes/${id}`);
   dispatch({
    type: ANALYSES_TYPES.DELETE_GENE,
    payload: res.data,
   });
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);
   dispatch({
    type: ANALYSES_TYPES.DELETE_GENE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const addGene =
 (type: Pick<IGene, 'nom' | 'description'>) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.LOADING_ANALYSE,
  });
  try {
   const res = await axios.post('/api/admin/genes', type, CONFIG);
   dispatch({
    type: ANALYSES_TYPES.ADD_GENE,
    payload: res.data,
   });
   dispatch(
    setAlert(`Gene "${type.nom}" ajouté avec succès`, AlertTypes.SUCCESS)
   );
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);

   dispatch({
    type: ANALYSES_TYPES.ADD_GENE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const updateGeneById =
 (id: string, type: Partial<Pick<IGene, 'nom' | 'description'>>) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.LOADING_ANALYSE,
  });
  try {
   const res = await axios.put(`/api/admin/genes/${id}`, type, CONFIG);
   dispatch({
    type: ANALYSES_TYPES.UPDATE_GENE,
    payload: res.data,
   });
   dispatch(
    setAlert(`Gene "${type.nom}" modifié avec succès`, AlertTypes.SUCCESS)
   );
  } catch (err: any) {
   const error = err.response.data.errors
    ? err.response.data.errors[0] || Object(err.response.data.msg)
    : Object(err.response.data.msg);

   dispatch({
    type: ANALYSES_TYPES.UPDATE_GENE_ERROR,
    payload: error,
   });
   dispatch(setAlert(error.msg, AlertTypes.DANGER));
  }
 };

export const selectGene =
 (gene: IGene) => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.SELECT_GENE,
   payload: gene,
  });
 };

export const clearSelectedGene =
 () => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  dispatch({
   type: ANALYSES_TYPES.CLEAR_SELECTED_GENE,
  });
 };
