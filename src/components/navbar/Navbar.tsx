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
 profile,
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
   {/*//! Profile Menu */}
   <li>
    {isAuthenticated &&
     !loading &&
     !profile.loading &&
     profile.profile !== null && (
      <Link to={`/profiles/${profile.profile._id}`}>Profile</Link>
     )}
   </li>
  </ul>
 );

 const SearchForm = () => (
  <form action="" className="search hide-on-small-and-down">
   <FontAwesomeIcon size="4x" icon={['fas', 'search']} color="black" />
   <input type="search" />
  </form>
 );

 const Mobile = () => (
  <ul className="sidenav" id="mobile">
   <li>
    <Link className="sidenav-close" to="/">
     Home
    </Link>
   </li>
   {/*//! Profile Menu */}
   <li>
    {isAuthenticated &&
     !loading &&
     !profile.loading &&
     profile.profile !== null && (
      <Link to={`/profiles/${profile.profile._id}`}>Profile</Link>
     )}
   </li>
   {isAuthenticated && !loading && !profile.loading && (
    <li onClick={logout}>
     <Link className="sidenav-close" to="#">
      Logout
     </Link>
    </li>
   )}
  </ul>
 );

 //!---------------------------- RETURN ----------------------------------
 //  if (isAuthenticated && !loading) { //TODO Remove comment when login works
 return (
  <>
   <nav id="navbar">
    <div className="nav-wrapper ">
     <Logo />
     <Link to="#" data-target="mobile" className="sidenav-trigger">
      <FontAwesomeIcon size="lg" icon={['fas', 'bars']} />
     </Link>
     <SearchForm />
     <RightMenu />
    </div>
   </nav>
   <Mobile />
  </>
 );
 //  } else {
 //   return <></>;
 //  }
};

const mapStateToProps = (state: AppState) => ({
 auth: state.auth,
 profile: state.profile,
});

const mapDispatchToProps = { logout };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Navbar);
