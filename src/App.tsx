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
import { useComponentWillMount } from './global';
import { Options } from './components/options/Options';
import { getAnalyseTypes } from './actions/analyses';
import './css/App.css';

// Font-awesome:
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const App = ({ auth, loadUser, getAnalyseTypes }: PropsFromRedux) => {
 useComponentWillMount(() => {
  loadUser();
  getAnalyseTypes();
 });

 return (
  <div className="app">
   <Router>
    <Alert />
    <Navbar />
    <div className="main">
     <Switch>
      <Route path="/login" component={Login} />
      <PrivateRoute path="/options" component={Options} />
      <PrivateRoute path="/" component={Dashboard} />
     </Switch>
    </div>
   </Router>
  </div>
 );
};

const mapState = (state: AppState) => ({
 auth: state.auth,
});

const mapDispatch = {
 loadUser,
 getAnalyseTypes,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
