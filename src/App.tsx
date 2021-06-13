import './css/App.css';
// Redux
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from './store';
// Else
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import { loadUser } from './actions/auth';
import { useComponentWillMount } from './global';

const App = ({ auth, loadUser }: PropsFromRedux) => {
 useComponentWillMount(() => {
  loadUser();
 });

 return (
  <Router>
   <Alert />
   <Navbar />
   <Switch>
    <Route path="/login" component={Login} />
    <PrivateRoute path="/" component={Dashboard} />
   </Switch>
  </Router>
 );
};

const mapState = (state: AppState) => ({
 auth: state.auth,
});

const mapDispatch = {
 loadUser,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
