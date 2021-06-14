import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export const Logo = () => {
 return (
  <Link className="brand-logo logo" to={'/'}>
   <img src={logo} alt="mypet" draggable={'false'} />
  </Link>
 );
};
