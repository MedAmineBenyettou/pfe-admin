import { useState } from 'react';
import { Link } from 'react-router-dom';
import Admins from './Admins';
import Profil from './Profil';
import Laboratoire from './Laboratoire';

import '../../css/options/Options.css';

export const Options = () => {
 const [state, setState] = useState(<Profil />);

 return (
  <div className="options row">
   <div className="options-sidenav col m3 s12 row">
    <p className="col s12">Options</p>
    <Link
     to="#"
     className="waves-effect waves-light"
     onClick={() => {
      setState(<Profil />);
     }}
    >
     Profil
    </Link>
    <Link
     to="#"
     className="waves-effect waves-light"
     onClick={() => {
      setState(<Admins />);
     }}
    >
     Admins
    </Link>
    <Link
     to="#"
     className="waves-effect waves-light"
     onClick={() => {
      setState(<Laboratoire />);
     }}
    >
     Laboratoire
    </Link>
   </div>
   <div className="options-main col m9 s12 offset-m3">{state}</div>
  </div>
 );
};
