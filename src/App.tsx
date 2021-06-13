import './css/App.css';
// Redux
import { connect } from 'react-redux';
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

interface MapStateProps extends Pick<AppState, 'auth'> {}
interface MapDispatchProps {
 loadUser: typeof loadUser;
}

interface Props extends MapStateProps, MapDispatchProps {}

const App = ({ auth, loadUser }: Props) => {
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

const mapStateToProps = (state: AppState) => ({
 auth: state.auth,
});

const mapDispatchToProps: MapDispatchProps = {
 loadUser,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(App);
