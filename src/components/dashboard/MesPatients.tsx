import { ConnectedProps, connect } from 'react-redux';
import { AppState } from '../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { Link } from 'react-router-dom';

export const MesPatients = ({
 analyses: { loading, analyses },
 profile,
 selectAnalyse,
 clearSelectedAnalyse,
 getAnalyses,
 lang,
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

 const handleOnClick = (a: IAnalyse) => {
  selectAnalyse(a);
  setTimeout(() => {
   var elmnt = document.getElementById('AnalyseModal');
   if (elmnt) {
    var inst = M.Modal.getInstance(elmnt);
    if (inst) {
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
   }
  }, 1000);
 };

 const displayPagination = () => {
  if (analyses.params) {
   let temps = [];
   for (let i = 1; i <= analyses.params.totalPages; i++)
    temps.push(
     <li
      key={i}
      onClick={(e) => {
       getAnalyses({ page: i });
      }}
      className={analyses.params.page === i ? 'active' : 'waves-effect'}
     >
      <Link to="#!">{i}</Link>
     </li>
    );
   const handlePageChevrons = (next: boolean) => {
    if (!next) {
     if (analyses.params && analyses.params.prevPage !== null)
      getAnalyses({ page: analyses.params.prevPage });
    } else if (analyses.params && analyses.params.nextPage !== null)
     getAnalyses({ page: analyses.params.nextPage });
   };
   return (
    <ul className="pagination">
     <li
      onClick={() => handlePageChevrons(false)}
      className={
       !(analyses.params && analyses.params.prevPage !== null)
        ? 'disabled'
        : 'waves-effect'
      }
     >
      <Link to="#!">
       <FontAwesomeIcon size="xs" icon={['fas', 'chevron-left']} />
      </Link>
     </li>
     {temps}
     <li
      onClick={() => handlePageChevrons(true)}
      className={
       !(analyses.params && analyses.params.nextPage !== null)
        ? 'disabled'
        : 'waves-effect'
      }
     >
      <Link to="#!">
       <FontAwesomeIcon size="xs" icon={['fas', 'chevron-right']} />
      </Link>
     </li>
    </ul>
   );
  } else return <></>;
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
    const temp = analyses.data.filter(
     (a) => a.etat === type && a.user._id.match(profile._id)
    );
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
       </div>
      </div>
     ));
    else
     return (
      <p className="empty-list">
       {lang.messages.find((m) => m.code.match(String(0)))?.message}
      </p>
     );
   }
  } else return <Spinner />;
 };

 return (
  <div className="mespatients section col s12">
   <div className="section-header">
    <h5>Mes patients:</h5>
    <div className="analysesPagination">{displayPagination()}</div>
    <div className="buttons">
     <a
      href="#AnalyseModal"
      className="btn-floating btn-large waves-effect waves-light"
      onClick={handleOpenModal}
     >
      <FontAwesomeIcon size="lg" icon={['fas', 'plus']} />
     </a>
     <Link
      to={{ pathname: '/analyses', state: { mine: true } }}
      className="btn waves-effect waves-light allanalyses-btn"
     >
      {lang.messages.find((m) => m.code.match(String(1)))?.message}
     </Link>
    </div>
   </div>
   <>
    <div className="tab col m4 s12">
     <div className="collection with-header">
      <h4 className="collection-header">
       <img src={waiting} alt="waiting" className="circle" />
       {lang.messages.find((m) => m.code.match(String(2)))?.message}
      </h4>
      {display(-1)}
     </div>
    </div>
    <div className="tab col m4 s12">
     <div className="collection with-header">
      <h4 className="collection-header">
       <img src={gears} alt="gears" className="circle" />
       {lang.messages.find((m) => m.code.match(String(3)))?.message}
      </h4>
      {display(0)}
     </div>
    </div>
    <div className="tab col m4 s12">
     <div className="collection with-header">
      <h4 className="collection-header">
       <img src={done} alt="done" className="circle" />
       {lang.messages.find((m) => m.code.match(String(4)))?.message}
      </h4>
      {display(1)}
     </div>
    </div>
   </>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
 profile: state.profile.profile,
 lang: state.lang.lang,
});

const mapDispatchToProps = {
 selectAnalyse,
 clearSelectedAnalyse,
 getAnalyses,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(MesPatients);
