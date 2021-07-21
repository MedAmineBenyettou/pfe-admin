import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../layout/Spinner';
import { getGenes } from '../../actions/analyses';

export const Laboratoire = ({ analyses, getGenes }: PropsFromRedux) => {
 useEffect(() => {
  getGenes();
 }, [getGenes]);

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
   <li className="collection-item">
    <div className="row">
     <div className="col s9">
      <span className="nom">{g.nom}</span>
      <p className="desc">{g.description}</p>
     </div>
     <div className="col s3">
      <a href="#" className="secondary-content">
       <FontAwesomeIcon size="2x" icon={['fas', 'times']} />
      </a>
     </div>
    </div>
   </li>
  ));
 };

 const displayAnalyses = () => (
  <li className="collection-item">
   <div className="row">
    <div className="col s9">
     <span className="nom">Nom</span>
     <p className="desc">Description</p>
     <div className="genes">
      <div className="chip">Test1</div>
      <div className="chip">Test2</div>
     </div>
    </div>
    <div className="col s3">
     <a href="#" className="secondary-content">
      <FontAwesomeIcon size="2x" icon={['fas', 'times']} />
     </a>
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
      <h4 className="col s4">Gênes</h4>
      <a
       className="col offset-l7 offset-m5 offset-s4 btn-floating btn-large waves-effect waves-light right modal-trigger"
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
      <h4 className="col s4">Types d'analyses</h4>
      <Link
       to="#"
       className="col offset-l7 offset-m5 offset-s4 btn-floating btn-large waves-effect waves-light right"
      >
       <FontAwesomeIcon size="lg" icon={['fas', 'plus']} />
      </Link>
     </li>
     {displayAnalyses()}
    </ul>
   </div>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
});

const mapDispatchToProps = { getGenes };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Laboratoire);
