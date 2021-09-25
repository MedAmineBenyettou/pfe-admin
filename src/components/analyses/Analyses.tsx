import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router';
import { AppState } from '../../store';
import {
 selectAnalyse,
 clearSelectedAnalyse,
 getAnalyses,
} from '../../actions/analyses';
import done from '../../assets/done.png';
import waiting from '../../assets/waiting.png';
import gears from '../../assets/gears.png';
import Spinner from '../layout/Spinner';
import moment from 'moment';
import { IAnalyse } from '../../reducers/analyses';
import AnalyseModal from '../Modals/AnalyseModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Analyses = ({
 analyses: { loading, analyses },
 profile,
 selectAnalyse,
 clearSelectedAnalyse,
 getAnalyses,
}: PropsFromRedux) => {
 const { state }: any = useLocation();

 useEffect(() => {
  if (state) getAnalyses();
 }, []);

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

 const handleOnClick = (a: IAnalyse) => {
  selectAnalyse(a);
  setTimeout(() => {
   var elmnt = document.getElementById('AnalyseModal');
   if (elmnt) {
    var inst = M.Modal.getInstance(elmnt);
    inst.options = {
     ...inst.options,
     dismissible: true,
     onCloseEnd: () => {
      clearSelectedAnalyse();
     },
     onOpenEnd: () => {
      var elem = document.querySelector('#AnalyseModal .tabs');
      if (elem) {
       M.Tabs.init(elem, {
        swipeable: true,
        onShow: (e) => {
         //  console.log(e);
        },
       });
      }
     },
    };
    inst.open();
   }
  }, 1000);
 };

 const display = (type: number) => {
  var elem = document.querySelector('#AnalyseModal .tabs');
  if (elem) {
   M.Tabs.init(elem, {
    swipeable: true,
    onShow: (e) => {
     //  console.log(e);
    },
   });
  }
  if (!loading) {
   if (profile && analyses.data && analyses.data.length > 0) {
    const temp =
     state && state.mine
      ? analyses.data.filter(
         (a) => a.etat === type && a.user._id.match(profile._id)
        )
      : analyses.data.filter((a) => a.etat === type);
    if (temp.length > 0)
     return temp.map((a) => (
      <div
       key={a._id}
       onClick={() => handleOnClick(a)}
       className="collection-item tooltipped"
       data-position="bottom"
       data-tooltip={a.description}
      >
       <span className="type">{a.type.nom}</span>
       <p className="nom">{a.patient.nom + ' ' + a.patient.prenom}</p>
       <div className="row sub-info">
        {type !== 1 ? (
         <span className="date col s3 offset-s9">
          {moment(a.date).format('DD/MM/YYYY')}
         </span>
        ) : (
         <>
          <span className={`col s3 ${a.positive ? 'red-text' : ''}`}>
           {a.positive ? 'Positive' : 'Négative'}
          </span>
          <span className="date col s3 offset-s6">
           {moment(a.date).format('DD/MM/YYYY')}
          </span>
         </>
        )}
        <span className="col s12">{a.user.user.username}</span>
       </div>
      </div>
     ));
    else return <p className="empty-list">Liste vide</p>;
   }
  } else return <Spinner />;
 };

 return (
  <div className="row analyses">
   <div className="section col s12">
    <AnalyseModal />
    <div className="section-header row">
     <h5 className="col s4">
      {state && state.mine ? 'Mes ' : 'Tous les '}patients:
     </h5>
     <div className="right buttons">
      <a
       href="#AnalyseModal"
       className="btn-floating btn-large waves-effect waves-light"
       onClick={handleOpenModal}
      >
       <FontAwesomeIcon size="lg" icon={['fas', 'plus']} />
      </a>
     </div>
    </div>
    <>
     <div className="tab col m4 s12">
      <div className="collection with-header">
       <h4 className="collection-header">
        <img src={waiting} alt="waiting" className="circle" />
        En attente
       </h4>
       {display(-1)}
      </div>
     </div>
     <div className="tab col m4 s12">
      <div className="collection with-header">
       <h4 className="collection-header">
        <img src={gears} alt="gears" className="circle" />
        En cours
       </h4>
       {display(0)}
      </div>
     </div>
     <div className="tab col m4 s12">
      <div className="collection with-header">
       <h4 className="collection-header">
        <img src={done} alt="done" className="circle" />
        Terminé
       </h4>
       {display(1)}
      </div>
     </div>
    </>
   </div>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
 profile: state.profile.profile,
});

const mapDispatchToProps = { selectAnalyse, clearSelectedAnalyse, getAnalyses };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Analyses);
