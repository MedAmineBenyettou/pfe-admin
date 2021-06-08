import React from 'react';
import './css/App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const App = () => {
 return (
  <Provider store={store}>
   <div className="App">App is working</div>
  </Provider>
 );
};

export default App;
