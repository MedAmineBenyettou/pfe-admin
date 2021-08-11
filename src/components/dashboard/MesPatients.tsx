import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnalyseModal from '../Modals/AnalyseModal';

import done from '../../assets/done.png';
import waiting from '../../assets/waiting.png';
import gears from '../../assets/gears.png';

export const MesPatients = ({
 analyses: { loading, analyses },
}: PropsFromRedux) => {
 const handleOpenModal = () => {
  var elmnt = document.getElementById('AnalyseModal');
  if (elmnt) {
   var inst = M.Modal.init(elmnt, {
    dismissible: true,
    onCloseEnd: () => {
     //    setTargetProfile(null);
    },
   });
   inst.open();
   var elem = document.querySelector('#AnalyseModal .tabs');
   if (elem) {
    M.Tabs.init(elem, {
     swipeable: true,
     onShow: (e) => {
      //  console.log(e);
     },
    });
   }
  }
 };

 return (
  <div className="section col s12">
   <AnalyseModal />
   <div className="section-header row">
    <h5 className="col s4">Mes patients:</h5>
    <a
     href="#AnalyseModal"
     className="btn-floating btn-large waves-effect waves-light right"
     onClick={handleOpenModal}
    >
     <FontAwesomeIcon size="lg" icon={['fas', 'plus']} />
    </a>
   </div>
   <div className="tab col m4 s12">
    <div className="collection with-header">
     <h4 className="collection-header">
      <img src={waiting} alt="waiting" className="circle" />
      En attente
     </h4>
     <div className="collection-item">
      <span className="type">type</span>
      <p className="nom">Nom et prénom</p>
      <div className="row sub-info">
       <span className="date col s2 offset-s10">26/06</span>
      </div>
     </div>
     <div className="collection-item">Alvin</div>
    </div>
   </div>
   <div className="tab col m4 s12">
    <div className="collection with-header">
     <h4 className="collection-header">
      <img src={gears} alt="gears" className="circle" />
      En cours
     </h4>
     <div className="collection-item">
      <span className="title">Title</span>
      <p>
       First Line <br />
       Second Line
      </p>
     </div>
     <div className="collection-item">Alvin</div>
     <div className="collection-item">Alvin</div>
     <div className="collection-item">Alvin</div>
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

export default connector(MesPatients);
