import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '../../store';

import done from '../../assets/done.png';
import waiting from '../../assets/waiting.png';
import gears from '../../assets/gears.png';

export const ToutLesPatients = ({
 analyses: { loading, analyses },
}: PropsFromRedux) => {
 return (
  <div className="section col s12">
   <h5 className="section-header">Tout:</h5>
   <div className="tab col m4 s12">
    <div className="collection with-header">
     <h4 className="collection-header">
      <img src={waiting} alt="waiting" className="circle" />
      En attente
     </h4>
     <a href="#" className="collection-item">
      <span className="type">type</span>
      <p className="nom">Nom et prénom</p>
      <div className="row sub-info">
       <span className="admin col s10">admin flen</span>
       <span className="date col s2">26/06</span>
      </div>
     </a>
     <a href="#" className="collection-item">
      Alvin
     </a>
    </div>
   </div>
   <div className="tab col m4 s12">
    <div className="collection with-header">
     <h4 className="collection-header">
      <img src={gears} alt="gears" className="circle" />
      En cours
     </h4>
     <a href="#" className="collection-item">
      <span className="title">Title</span>
      <p>
       First Line <br />
       Second Line
      </p>
     </a>
     <a href="#" className="collection-item">
      Alvin
     </a>
     <a href="#" className="collection-item">
      Alvin
     </a>
     <a href="#" className="collection-item">
      Alvin
     </a>
    </div>
   </div>
   <div className="tab col m4 s12">
    <div className="collection with-header">
     <h4 className="collection-header">
      <img src={done} alt="done" className="circle" />
      Terminé
     </h4>
     <p className="empty-list">Liste vide</p>
    </div>
   </div>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ToutLesPatients);
