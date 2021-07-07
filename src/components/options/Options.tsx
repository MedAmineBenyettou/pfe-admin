import { useState } from 'react';
import { Link } from 'react-router-dom';
import Admins from './Admins';
import Profil from './Profil';

import '../../css/options/Options.css';

export const Options = () => {
 const [state, setState] = useState(<Profil />);

 return (
  <div className="options row">
   <div className="options-sidenav col s3">
    <p>Options</p>
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
   </div>
   <div className="options-main col s9 offset-s3">{state}</div>
  </div>
 );
};
