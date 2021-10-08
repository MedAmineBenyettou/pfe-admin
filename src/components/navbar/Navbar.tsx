import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '../layout/Logo';
import { initMaterialize } from '../../general/initMaterialize';
import { getLangMessage } from '../../actions/lang';

import '../../css/navbar/Navbar.css';

export const Navbar = ({
 auth: { isAuthenticated, loading },
 logout,
 getLangMessage,
}: PropsFromRedux) => {
 useEffect(() => {
  initMaterialize();
 });

 const RightMenu = () => (
  <ul className="right-options right hide-on-med-and-down">
   <li>
    <Link to="/">{getLangMessage(9)}</Link>
   </li>
   {isAuthenticated && !loading && (
    <>
     <li>
      <Link to={`/options`}>{getLangMessage(10)}</Link>
     </li>
     <li>
      <Link to={`/patients`}>{getLangMessage(11)}</Link>
     </li>
     <li>
      <Link to={`/stats`}>{getLangMessage(12)}</Link>
     </li>
    </>
   )}
   <li onClick={logout} className="red lighten-2">
    {' '}
    <Link className="sidenav-close" to="#">
     {getLangMessage(13)}
    </Link>
   </li>
  </ul>
 );

 const Mobile = () => (
  <ul className="sidenav" id="mobile">
   <li>
    <Link className="sidenav-close" to="/">
     {getLangMessage(9)}
    </Link>
   </li>
   <li>
    {isAuthenticated && !loading && (
     <>
      <Link to={`/options`} className="sidenav-close">
       {getLangMessage(10)}
      </Link>
      <Link to={`/patients`} className="sidenav-close">
       {getLangMessage(11)}
      </Link>
      <Link to={`/stats`} className="sidenav-close">
       {getLangMessage(12)}
      </Link>
     </>
    )}
   </li>

   <li onClick={logout} className="red lighten-2">
    <Link className="sidenav-close" to="#">
     {getLangMessage(13)}
    </Link>
   </li>
  </ul>
 );

 //!---------------------------- RETURN ----------------------------------
 if (isAuthenticated) {
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

const mapDispatchToProps = { logout, getLangMessage };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navbar);
