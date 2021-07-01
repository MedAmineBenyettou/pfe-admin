import { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';
import Lform from './Lform';

import '../../css/Login/Login.css';

function Login({
 auth: { isAuthenticated, loading },
}: ReduxProps): ReactElement {
 if (loading) return <Spinner />;
 if (isAuthenticated) return <Redirect to="/" />;

 return (
  <div id="LRscreen_id" className="LRscreen row">
   <div className="LRform col m6 offset-m3 s10 offset-s1">
    {/*//! Forms */}
    <Lform />
   </div>

   {/*//! Footer  */}
   <div className="LRfooter col s12">
    <div className="col s12 container">
     <p>LADEAO</p>
    </div>
   </div>
  </div>
 );
}

const mapState = (state: AppState) => ({
 auth: state.auth,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Login);
