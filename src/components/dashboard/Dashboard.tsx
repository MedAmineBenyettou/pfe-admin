import { useEffect } from 'react';
import { connect } from 'react-redux';
import MesPatients from './MesPatients';
import ToutLesPatients from './ToutLesPatients';
import { getAllUsersProfiles } from '../../actions/userProfiles';
import { getAnalyses } from '../../actions/analyses';

import '../../css/dashboard/dashboard.css';

const Dashboard = ({ getAllUsersProfiles, getAnalyses }: any) => {
 useEffect(() => {
  getAllUsersProfiles();
  getAnalyses({ page: 1 });
 }, [getAllUsersProfiles, getAnalyses]);
 return (
  <div className="dashboard row">
   <MesPatients />
   <div className="divider"></div>
   <ToutLesPatients />
  </div>
 );
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
 getAllUsersProfiles,
 getAnalyses,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
