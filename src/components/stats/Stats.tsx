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
import { AppState } from '../../store';

const Stats = ({ getAllUsersProfiles, getAnalyses, lang }: any) => {
 useEffect(() => {
  getAllUsersProfiles();
  getAnalyses();
 }, [getAllUsersProfiles, getAnalyses]);

 return (
  <div className="stats row">
   <div className="header col s12 center">
    <p className="header-desc col s8 offset-s2">
     {lang.messages.find((m: any) => m.code.match(String(70)))?.message}
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

const mapStateToProps = (state: AppState) => ({
 lang: state.lang.lang,
});

export default connect(mapStateToProps, {
 getAllUsersProfiles,
 getAnalyses,
})(Stats);
