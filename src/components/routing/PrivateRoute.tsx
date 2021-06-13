import { connect, MapStateToPropsParam } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { setAlert } from '../../actions/alerts';
import { AlertTypes } from '../../reducers/alerts';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';

interface Props extends Pick<AppState, 'auth'>, RouteProps {
 component: any;
}

const PrivateRoute = ({
 component: Component,
 auth: { loading, isAuthenticated },
 ...rest
}: Props) => {
 return (
  <Route
   {...rest}
   render={(props) => {
    if (!loading && isAuthenticated) return <Component {...props} />;
    if (loading) return <Spinner />;
    else {
     setAlert(
      'Vous devez être connecter pour pouvoir voir cette page!',
      AlertTypes.DANGER
     );
     return <Redirect to="/login" />;
    }
   }}
  />
 );
};

const mapStateToProps: MapStateToPropsParam<Pick<Props, 'auth'>, {}, AppState> =
 (state: AppState) => ({
  auth: state.auth,
 });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
