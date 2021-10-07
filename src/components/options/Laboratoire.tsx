import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../layout/Spinner';
import {
 clearSelectedGene,
 selectGene,
 getGenes,
 deleteGeneById,
 selectType,
 clearSelectedType,
 deleteTypeById,
 getAnalyseTypes,
} from '../../actions/analyses';
import { IAnalyseType, IGene } from '../../reducers/analyses';
import { initMaterialize } from '../../general/initMaterialize';
import { getLangMessage } from '../../actions/lang';

export const Laboratoire = ({
 analyses,
 getGenes,
 clearSelectedGene,
 selectGene,
 deleteGeneById,
 clearSelectedType,
 deleteTypeById,
 selectType,
 getAnalyseTypes,
 getLangMessage,
}: PropsFromRedux) => {
 useEffect(() => {
  getGenes();
  getAnalyseTypes();
 }, [getGenes, getAnalyseTypes]);

 useEffect(() => {
  initMaterialize();
 }, []);

 const handleDeleteGene = (g: IGene) => {
  selectGene(g);
  setTimeout(() => {
   var elmnt = document.getElementById('confirmDeleteGene');
   if (elmnt) {
    var inst = M.Modal.getInstance(elmnt);
    inst.options = {
     ...inst.options,
     dismissible: true,
     onCloseEnd: () => {
      clearSelectedGene();
     },
    };
    inst.open();
   }
  }, 500);
 };

 const handleDeleteType = (t: IAnalyseType) => {
  selectType(t);
  setTimeout(() => {
   var elmnt = document.getElementById('confirmDeleteType');
   if (elmnt) {
    var inst = M.Modal.getInstance(elmnt);
    inst.options = {
     ...inst.options,
     dismissible: true,
     onCloseEnd: () => {
      clearSelectedType();
     },
    };
    inst.open();
   }
  }, 500);
 };

 const handleUpdateType = (t: IAnalyseType) => {
  selectType(t);
  setTimeout(() => {
   var elmnt = document.getElementById('AnalyseTypeModal');
   if (elmnt) {
    var inst = M.Modal.getInstance(elmnt);
    inst.options = {
     ...inst.options,
     dismissible: true,
     onCloseEnd: () => {
      clearSelectedType();
     },
    };
    inst.open();
   }
  }, 1000);
 };

 const handleUpdateGene = (g: IGene) => {
  selectGene(g);
  setTimeout(() => {
   var elmnt = document.getElementById('GeneModal');
   if (elmnt) {
    var inst = M.Modal.getInstance(elmnt);
    inst.options = {
     ...inst.options,
     dismissible: true,
     onCloseEnd: () => {
      clearSelectedGene();
     },
    };
    inst.open();
   }
  }, 1000);
 };

 const displayGenes = () => {
  if (analyses.loading)
   return (
    <li>
     <div className="row">
      <div className="col s12">
       <Spinner />
      </div>
     </div>
    </li>
   );
  if (analyses.genes.length < 1)
   return (
    <li>
     <div className="row">
      <div className="col s12">
       <p className="warning center-text">Pas de gênes.</p>
       <p className="info center-text">Il faut ajouter des gênes d'abord.</p>
      </div>
     </div>
    </li>
   );
  return analyses.genes.map((g) => (
   <li key={g._id} className="collection-item">
    <div className="row">
     <div
      className="col s11"
      onClick={() => {
       handleUpdateGene(g);
      }}
     >
      <span className="nom">{g.nom}</span>
      <p className="desc">{g.description}</p>
     </div>
     <button
      className="col s1 waves-effect waves-light mymodal-trigger"
      onClick={() => handleDeleteGene(g)}
     >
      <span className="secondary-content">
       <FontAwesomeIcon size="2x" icon={['fas', 'times']} />
      </span>
     </button>
    </div>
   </li>
  ));
 };

 const displayTypeGenes = (t: IAnalyseType) =>
  t.genes.map((g) => (
   <div key={g._id} className="chip">
    {g.nom}
   </div>
  ));

 const displayAnalyses = () => {
  if (analyses.loading)
   return (
    <li>
     <div className="row">
      <div className="col s12">
       <Spinner />
      </div>
     </div>
    </li>
   );
  if (analyses.types.length < 1)
   return (
    <li>
     <div className="row">
      <div className="col s12">
       <p className="warning center-text">Pas de types d'analyse.</p>
       <p className="info center-text">Il faut ajouter des types d'abord.</p>
      </div>
     </div>
    </li>
   );
  return analyses.types.map((t) => (
   <li key={t._id} className="collection-item">
    <div className="row">
     <div
      className="col s11"
      onClick={() => {
       handleUpdateType(t);
      }}
     >
      <span className="nom">{t.nom}</span>
      <p className="desc">{t.description}</p>
      <div className="genes">{displayTypeGenes(t)}</div>
     </div>
     <button
      className="col s1 waves-effect waves-light mymodal-trigger"
      onClick={() => handleDeleteType(t)}
     >
      <span className="secondary-content">
       <FontAwesomeIcon size="2x" icon={['fas', 'times']} />
      </span>
     </button>
    </div>
   </li>
  ));
 };

 return (
  <div className="laboratoire">
   <p className="header-desc">{getLangMessage(53)}</p>
   <h1 className="header">{getLangMessage(54)}</h1>
   <div className="content row">
    <ul className="collection with-header genes">
     <li className="collection-header row">
      <h4 className="col s8 m10">{getLangMessage(55)}</h4>
      <a
       className="btn-floating btn-large waves-effect waves-light right modal-trigger"
       href="#GeneModal"
      >
       <FontAwesomeIcon size="lg" icon={['fas', 'plus']} />
      </a>
     </li>
     {displayGenes()}
    </ul>
    <div className="divider"></div>
    <ul className="collection with-header types">
     <li className="collection-header row">
      <h4 className="col s8 m10">{getLangMessage(56)}</h4>
      <a
       href="#AnalyseTypeModal"
       className="btn-floating btn-large waves-effect waves-light right modal-trigger"
      >
       <FontAwesomeIcon size="lg" icon={['fas', 'plus']} />
      </a>
     </li>
     {displayAnalyses()}
    </ul>
   </div>
   {/*//! MODAL */}
   <div id="confirmDeleteGene" className="modal">
    <div className="modal-content">
     <h4 className="warning">
      {getLangMessage(57)} "{analyses.selection.gene?.nom}"?
     </h4>
     <p>{getLangMessage(58)}</p>
    </div>
    <div className="modal-footer">
     <button
      onClick={() => {
       if (analyses.selection.gene) deleteGeneById(analyses.selection.gene._id);
      }}
      className="modal-close waves-effect btn-flat"
     >
      {getLangMessage(59)}
     </button>
     <button className="modal-close waves-effect btn-flat white black-text">
      {getLangMessage(22)}
     </button>
    </div>
   </div>
   {/*//! MODAL Type*/}
   <div id="confirmDeleteType" className="modal">
    <div className="modal-content">
     <h4 className="warning">
      {getLangMessage(60)} "{analyses.selection.type?.nom}"?
     </h4>
     <p>{getLangMessage(58)}</p>
    </div>
    <div className="modal-footer">
     <button
      onClick={() => {
       if (analyses.selection.type) deleteTypeById(analyses.selection.type._id);
      }}
      className="modal-close waves-effect btn-flat"
     >
      {getLangMessage(59)}
     </button>
     <button className="modal-close waves-effect btn-flat white black-text">
      {getLangMessage(22)}
     </button>
    </div>
   </div>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
});

const mapDispatchToProps = {
 clearSelectedGene,
 selectGene,
 getGenes,
 deleteGeneById,
 selectType,
 clearSelectedType,
 deleteTypeById,
 getAnalyseTypes,
 getLangMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Laboratoire);
