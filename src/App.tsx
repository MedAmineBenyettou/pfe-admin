import './css/App.css';
// Redux
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from './store';
import { loadUser } from './actions/auth';
// Else
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import AddGeneModal from './components/Modals/AddGeneModal';
import AdminModal from './components/Modals/AdminModal';
import AnalyseTypeModal from './components/Modals/AnalyseTypeModal';
import UserModal from './components/Modals/UserModal';
import Patients from './components/patients/Patients';
import { Stats } from './components/stats/Stats';
import { useComponentWillMount } from './global';
import { Options } from './components/options/Options';
import { getAnalyseTypes, getGenes } from './actions/analyses';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import fr from 'date-fns/locale/fr';

import './css/App.css';

// Font-awesome:
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const App = ({ auth, loadUser, getAnalyseTypes, getGenes }: PropsFromRedux) => {
 useComponentWillMount(() => {
  loadUser();
  getAnalyseTypes();
  getGenes();
 });

 return (
  <MuiPickersUtilsProvider locale={fr} utils={DateFnsUtils}>
   <div className="app">
    <Router>
     <Alert />
     <Navbar />
     <AddGeneModal />
     <AdminModal />
     <AnalyseTypeModal />
     <UserModal />
     <div className="main">
      <Switch>
       <Route path="/login" component={Login} />
       <PrivateRoute path="/options" component={Options} />
       <PrivateRoute path="/patients" component={Patients} />
       <PrivateRoute path="/stats" component={Stats} />
       <PrivateRoute path="/" component={Dashboard} />
      </Switch>
     </div>
    </Router>
   </div>
  </MuiPickersUtilsProvider>
 );
};

const mapState = (state: AppState) => ({
 auth: state.auth,
});

const mapDispatch = {
 loadUser,
 getAnalyseTypes,
 getGenes,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
