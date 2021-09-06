import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '../layout/Logo';
import { initMaterialize } from '../../general/initMaterialize';

import '../../css/navbar/Navbar.css';

export const Navbar = ({
 auth: { isAuthenticated, loading },
 logout,
}: PropsFromRedux) => {
 useEffect(() => {
  initMaterialize();
 });

 const RightMenu = () => (
  <ul className="right-options right hide-on-med-and-down">
   <li>
    <Link to="/">Home</Link>
   </li>
   {isAuthenticated && !loading && (
    <>
     <li>
      <Link to={`/options`}>Options</Link>
     </li>
     <li>
      <Link to={`/patients`}>Patients</Link>
     </li>
    </>
   )}
   <li onClick={logout} className="red lighten-2">
    {' '}
    <Link className="sidenav-close" to="#">
     Se deconnecter
    </Link>
   </li>
  </ul>
 );

 const Mobile = () => (
  <ul className="sidenav" id="mobile">
   <li>
    <Link className="sidenav-close" to="/">
     Home
    </Link>
   </li>
   <li>
    {isAuthenticated && !loading && (
     <>
      <Link to={`/options`} className="sidenav-close">
       Options
      </Link>
      <Link to={`/patients`} className="sidenav-close">
       Patients
      </Link>
     </>
    )}
   </li>

   <li onClick={logout} className="red lighten-2">
    <Link className="sidenav-close" to="#">
     Se deconnecter
    </Link>
   </li>
  </ul>
 );

 //!---------------------------- RETURN ----------------------------------
 if (isAuthenticated && !loading) {
  return (
   <>
    <nav id="navbar">
     <div className="nav-wrapper ">
      <Logo />
      <Link to="#" data-target="mobile" className="sidenav-trigger">
       <FontAwesomeIcon size="lg" icon={['fas', 'bars']} />
      </Link>
      <RightMenu />
     </div>
    </nav>
    <Mobile />
   </>
  );
 } else {
  return <></>;
 }
};

const mapStateToProps = (state: AppState) => ({
 auth: state.auth,
 profile: state.profile,
});

const mapDispatchToProps = { logout };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navbar);
