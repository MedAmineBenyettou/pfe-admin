import './css/App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

const App = () => {
 return (
  <Provider store={store}>
   <Alert />
   <div className="App">App is working</div>
  </Provider>
 );
};

export default App;
