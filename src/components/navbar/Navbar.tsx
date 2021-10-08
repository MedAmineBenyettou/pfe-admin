import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import { logout } from '../../actions/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logo } from '../layout/Logo';
import { initMaterialize } from '../../general/initMaterialize';
import LangSwitcher from './LangSwitcher';

import '../../css/navbar/Navbar.css';

export const Navbar = ({
 auth: { isAuthenticated, loading },
 lang,
 logout,
}: PropsFromRedux) => {
 useEffect(() => {
  initMaterialize();
 });

 const RightMenu = () => (
  <ul className="right-options right hide-on-med-and-down">
   <li>
    <Link to="/">
     {lang.messages.find((m) => m.code.match(String(9)))?.message}
    </Link>
   </li>
   {isAuthenticated && !loading && (
    <>
     <li>
      <Link to={`/options`}>
       {lang.messages.find((m) => m.code.match(String(10)))?.message}
      </Link>
     </li>
     <li>
      <Link to={`/patients`}>
       {lang.messages.find((m) => m.code.match(String(11)))?.message}
      </Link>
     </li>
     <li>
      <Link to={`/stats`}>
       {lang.messages.find((m) => m.code.match(String(12)))?.message}
      </Link>
     </li>
     <li>
      <LangSwitcher />
     </li>
    </>
   )}
   <li onClick={logout} className="red lighten-2">
    {' '}
    <Link className="sidenav-close" to="#">
     {lang.messages.find((m) => m.code.match(String(13)))?.message}
    </Link>
   </li>
  </ul>
 );

 const Mobile = () => (
  <ul className="sidenav" id="mobile">
   <li className="center-align">
    <LangSwitcher />
   </li>
   <li>
    <Link className="sidenav-close" to="/">
     {lang.messages.find((m) => m.code.match(String(9)))?.message}
    </Link>
   </li>
   <li>
    {isAuthenticated && !loading && (
     <>
      <Link to={`/options`} className="sidenav-close">
       {lang.messages.find((m) => m.code.match(String(10)))?.message}
      </Link>
      <Link to={`/patients`} className="sidenav-close">
       {lang.messages.find((m) => m.code.match(String(11)))?.message}
      </Link>
      <Link to={`/stats`} className="sidenav-close">
       {lang.messages.find((m) => m.code.match(String(12)))?.message}
      </Link>
     </>
    )}
   </li>
   <li onClick={logout} className="red lighten-2">
    <Link className="sidenav-close" to="#">
     {lang.messages.find((m) => m.code.match(String(13)))?.message}
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
 lang: state.lang.lang,
});

const mapDispatchToProps = { logout };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navbar);
