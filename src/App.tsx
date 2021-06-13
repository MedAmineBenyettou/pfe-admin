import './css/App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// Else
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

const App = () => {
 return (
  <Provider store={store}>
   <Router>
    <Alert />
    <Switch>
     <Route path="/login" component={Login} />
     <PrivateRoute path="/" component={Dashboard} />
    </Switch>
   </Router>
  </Provider>
 );
};

export default App;
