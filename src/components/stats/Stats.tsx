import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllUsersProfiles } from '../../actions/userProfiles';
import { getAnalyses } from '../../actions/analyses';

import AdminsActivity from './charts/AdminsActivity';
import AnalysesActivity from './charts/AnalysesActivity';
import AnalyseTypesActivity from './charts/AnalyseTypesActivity';
import GenesActivity from './charts/GenesActivity';
import UsersActivity from './charts/UsersActivity';

import '../../css/stats/stats.css';

const Stats = ({ getAllUsersProfiles, getAnalyses }: any) => {
 useEffect(() => {
  getAllUsersProfiles();
  getAnalyses();
 }, [getAllUsersProfiles, getAnalyses]);

 return (
  <div className="stats row">
   <div className="header col s12 center">
    <p className="header-desc col s8 offset-s2">
     Sur cette page, vous pouvez analyser les statistiques concernant les
     patients, les administrateurs et les analyses.
    </p>
   </div>
   <div className="content col s12 row">
    <div className="col s12">
     <AdminsActivity />
    </div>
    <div className="col s12">
     <AnalysesActivity />
    </div>
    <div className="col s6">
     <AnalyseTypesActivity />
    </div>
    <div
     className="col s6"
     style={{ borderLeft: '1px solid blue', paddingLeft: '20px' }}
    >
     <GenesActivity />
    </div>
    <div className="col s12">
     <UsersActivity />
    </div>
   </div>
  </div>
 );
};

export default connect(null, { getAllUsersProfiles, getAnalyses })(Stats);
