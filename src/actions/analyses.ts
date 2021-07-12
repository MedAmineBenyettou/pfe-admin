import { ANALYSE_TYPES } from './types';
import { ThunkDispatch } from 'redux-thunk';
import { IAnalyseAction, IAnalyseType } from '../reducers/analyses';
import axios from 'axios';
import { CONFIG } from '../general/Common';
import { setAlert } from './alerts';
import { AlertTypes } from '../reducers/alerts';

export const getAnalyseTypes =
 () => async (dispatch: ThunkDispatch<{}, {}, IAnalyseAction>) => {
  try {
   const res = await axios.get('/api/analyseTypes');
   dispatch({
    type: ANALYSE_TYPES.GET_TYPES,
    payload: res.data,
   });
  } catch (err) {
   dispatch({
    type: ANALYSE_TYPES.GET_TYPES_ERROR,
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
    type: ANALYSE_TYPES.ADD_TYPE,
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
    type: ANALYSE_TYPES.ADD_TYPE_ERROR,
    payload: err.response.data.msg,
   });
   dispatch(setAlert(err.response.data.msg, AlertTypes.DANGER));
  }
 };
