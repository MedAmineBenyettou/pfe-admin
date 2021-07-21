import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../layout/Spinner';
import {
 clearSelectedGene,
 selectGene,
 getGenes,
 deleteGeneById,
} from '../../actions/analyses';
import { IGene } from '../../reducers/analyses';
import { initMaterialize } from '../../general/initMaterialize';

export const Laboratoire = ({
 analyses,
 getGenes,
 clearSelectedGene,
 selectGene,
 deleteGeneById,
}: PropsFromRedux) => {
 useEffect(() => {
  getGenes();
 }, [getGenes]);

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
  if (analyses.error)
   return (
    <li>
     <div className="row">
      <div className="col s12">
       <p className="danger center-text">{analyses.error.msg}</p>
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

 const displayAnalyses = () => (
  <li className="collection-item">
   <div className="row">
    <div className="col s11">
     <span className="nom">Nom</span>
     <p className="desc">Description</p>
     <div className="genes">
      <div className="chip">Test1</div>
      <div className="chip">Test2</div>
     </div>
    </div>
    <div className="col s1">
     <span className="secondary-content">
      <FontAwesomeIcon size="2x" icon={['fas', 'times']} />
     </span>
    </div>
   </div>
  </li>
 );

 return (
  <div className="laboratoire">
   <p className="header-desc">
    Ajouter, modifier ou supprimer les types de gênes traités et types
    d'analyses proposer par le laboratoire
   </p>
   <h1 className="header">Laboratoire</h1>
   <div className="content row">
    <ul className="collection with-header genes">
     <li className="collection-header row">
      <h4 className="col s8 m10">Gênes</h4>
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
      <h4 className="col s8 m10">Types d'analyses</h4>
      <Link
       to="#"
       className="btn-floating btn-large waves-effect waves-light right"
      >
       <FontAwesomeIcon size="lg" icon={['fas', 'plus']} />
      </Link>
     </li>
     {displayAnalyses()}
    </ul>
   </div>
   {/*//! MODAL */}
   <div id="confirmDeleteGene" className="modal">
    <div className="modal-content">
     <h4 className="warning">
      Voulez vous vraiment supprimer ce gene "{analyses.selection.gene?.nom}"?
     </h4>
     <p>
      Une fois supprimer, vous ne pourrez plus l'utilisez dans les analyses!
     </p>
    </div>
    <div className="modal-footer">
     <button
      onClick={() => {
       if (analyses.selection.gene) deleteGeneById(analyses.selection.gene._id);
      }}
      className="modal-close waves-effect btn-flat"
     >
      Confirmer
     </button>
     <button className="modal-close waves-effect btn-flat white black-text">
      Annuler
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
 getGenes,
 clearSelectedGene,
 selectGene,
 deleteGeneById,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Laboratoire);
