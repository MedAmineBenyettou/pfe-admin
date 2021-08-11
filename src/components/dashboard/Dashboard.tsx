import MesPatients from './MesPatients';
import ToutLesPatients from './ToutLesPatients';

import '../../css/dashboard/dashboard.css';

const Dashboard = () => {
 return (
  <div className="dashboard row">
   <MesPatients />
   <div className="divider"></div>
   <ToutLesPatients />
  </div>
 );
};

export default Dashboard;
