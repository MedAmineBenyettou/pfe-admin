import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Admins from './Admins';
import Profil from './Profil';
import Laboratoire from './Laboratoire';
import '../../css/options/Options.css';
import { getLangMessage } from '../../actions/lang';

const Options = ({ getLangMessage }: any) => {
 const [state, setState] = useState(<Profil />);

 const handleClick = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  c: any
 ) => {
  setState(c);
  document.querySelectorAll('.option').forEach((e) => {
   e.classList.remove('side-active');
  });
  //@ts-ignore
  e.target.classList.toggle('side-active');
 };

 return (
  <div className="options row">
   <div className="options-sidenav col l2 m3 s12 row">
    <p className="col s12">{getLangMessage(10)}</p>
    <Link
     to="#"
     className="waves-effect waves-light option side-active"
     onClick={(e) => {
      handleClick(e, <Profil />);
     }}
    >
     {getLangMessage(61)}
    </Link>
    <Link
     to="#"
     className="waves-effect waves-light option"
     onClick={(e) => {
      handleClick(e, <Admins />);
     }}
    >
     {getLangMessage(62)}
    </Link>
    <Link
     to="#"
     className="waves-effect waves-light option"
     onClick={(e) => {
      handleClick(e, <Laboratoire />);
     }}
    >
     {getLangMessage(54)}
    </Link>
   </div>
   <div className="options-main col l10 m9 s12 offset-m3 offset-l2">
    {state}
   </div>
  </div>
 );
};

export default connect(null, { getLangMessage })(Options);
