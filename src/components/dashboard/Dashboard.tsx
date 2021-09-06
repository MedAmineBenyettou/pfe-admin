import { useEffect } from 'react';
import { connect } from 'react-redux';
import MesPatients from './MesPatients';
import ToutLesPatients from './ToutLesPatients';
import { getAllUsersProfiles } from '../../actions/userProfiles';

import '../../css/dashboard/dashboard.css';

const Dashboard = ({ getAllUsersProfiles }: any) => {
 useEffect(() => {
  getAllUsersProfiles();
 }, [getAllUsersProfiles]);
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
