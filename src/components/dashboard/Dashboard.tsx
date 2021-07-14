import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../../css/dashboard/dashboard.css';
import done from '../../assets/done.png';
import waiting from '../../assets/waiting.png';
import gears from '../../assets/gears.png';

interface Props {}

function Dashboard({}: Props): ReactElement {
 return (
  <div className="dashboard row">
   <div className="section col s12">
    <div className="section-header row">
     <h5 className="col s4">Mes patients:</h5>
     <Link
      to="#"
      className="btn-floating btn-large waves-effect waves-light right"
     >
      <FontAwesomeIcon size="lg" icon={['fas', 'plus']} />
     </Link>
    </div>
    <div className="tab col m4 s12">
     <div className="collection with-header">
      <h4 className="collection-header">
       <img src={waiting} alt="waiting" className="circle" />
       En attente
      </h4>
      <Link to="#" className="collection-item">
       <span className="type">type</span>
       <p className="nom">Nom et prénom</p>
       <div className="row sub-info">
        <span className="date col s2 offset-s10">26/06</span>
       </div>
      </Link>
      <Link to="#" className="collection-item">
       Alvin
      </Link>
     </div>
    </div>
    <div className="tab col m4 s12">
     <div className="collection with-header">
      <h4 className="collection-header">
       <img src={gears} alt="gears" className="circle" />
       En cours
      </h4>
      <Link to="#" className="collection-item">
       <span className="title">Title</span>
       <p>
        First Line <br />
        Second Line
       </p>
      </Link>
      <Link to="#" className="collection-item">
       Alvin
      </Link>
      <Link to="#" className="collection-item">
       Alvin
      </Link>
      <Link to="#" className="collection-item">
       Alvin
      </Link>
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
   <div className="divider"></div>
   <div className="section col s12">
    <h5 className="section-header">Tout:</h5>
    <div className="tab col m4 s12">
     <div className="collection with-header">
      <h4 className="collection-header">
       <img src={waiting} alt="waiting" className="circle" />
       En attente
      </h4>
      <Link to="#" className="collection-item">
       <span className="type">type</span>
       <p className="nom">Nom et prénom</p>
       <div className="row sub-info">
        <span className="admin col s10">admin flen</span>
        <span className="date col s2">26/06</span>
       </div>
      </Link>
      <Link to="#" className="collection-item">
       Alvin
      </Link>
     </div>
    </div>
    <div className="tab col m4 s12">
     <div className="collection with-header">
      <h4 className="collection-header">
       <img src={gears} alt="gears" className="circle" />
       En cours
      </h4>
      <Link to="#" className="collection-item">
       <span className="title">Title</span>
       <p>
        First Line <br />
        Second Line
       </p>
      </Link>
      <Link to="#" className="collection-item">
       Alvin
      </Link>
      <Link to="#" className="collection-item">
       Alvin
      </Link>
      <Link to="#" className="collection-item">
       Alvin
      </Link>
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
  </div>
 );
}

export default Dashboard;
