import { ANALYSES } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { IAnalyseAction, IAnalyseType, IGene } from '../reducers/analyses';
import axios from 'axios';
import { CONFIG } from '../general/Common';
import { setAlert } from './alerts';
import { AlertTypes } from '../reducers/alerts';

//! ANALYSE TYPES ------------------------------------------------------

export const getAnalyseTypes =
 () => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.get('/api/analyseTypes');
   dispatch({
    type: ANALYSES.GET_TYPES,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: ANALYSES.GET_TYPES_ERROR,
    payload: err.response.data.msg,
   });
   dispatch(setAlert(err.response.data.msg, AlertTypes.DANGER));
  }
 };

export const addAnalyseTypes =
 (type: Pick<IAnalyseType, 'nom' | 'description'>) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.post('/api/analyseTypes', type, CONFIG);
   dispatch({
    type: ANALYSES.ADD_TYPE,
    payload: res.data,
   });
   dispatch(
    setAlert(
     `Type d'analyse "${res.data.nom}" ajouté avec succès`,
     AlertTypes.DANGER
    )
   );
  } catch (err) {
   dispatch({
    type: ANALYSES.ADD_TYPE_ERROR,
    payload: err.response.data.msg,
   });
   dispatch(setAlert(err.response.data.msg, AlertTypes.DANGER));
  }
 };

//! GENES  ------------------------------------------------------------

export const getGenes =
 () => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.get('/api/admin/genes');
   dispatch({
    type: ANALYSES.GET_GENES,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: ANALYSES.GET_GENES_ERROR,
    payload: err.response.data.msg,
   });
   dispatch(setAlert(err.response.data.msg, AlertTypes.DANGER));
  }
 };

export const addGene =
 (type: Pick<IGene, 'nom' | 'description'>) =>
 async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.post('/api/admin/genes', type, CONFIG);
   dispatch({
    type: ANALYSES.ADD_GENE,
    payload: res.data,
   });
   dispatch(
    setAlert(`Gene "${res.data.nom}" ajouté avec succès`, AlertTypes.DANGER)
   );
  } catch (err) {
   dispatch({
    type: ANALYSES.ADD_GENE_ERROR,
    payload: err.response.data.msg,
   });
   dispatch(setAlert(err.response.data.msg, AlertTypes.DANGER));
  }
 };
