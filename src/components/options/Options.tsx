import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Admins from './Admins';
import Profil from './Profil';
import Laboratoire from './Laboratoire';
import '../../css/options/Options.css';
import { AppState } from '../../store';

const Options = ({ lang }: any) => {
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
    <p className="col s12">
     {lang.messages.find((m: any) => m.code.match(String(10)))?.message}
    </p>
    <Link
     to="#"
     className="waves-effect waves-light option side-active"
     onClick={(e) => {
      handleClick(e, <Profil />);
     }}
    >
     {lang.messages.find((m: any) => m.code.match(String(61)))?.message}
    </Link>
    <Link
     to="#"
     className="waves-effect waves-light option"
     onClick={(e) => {
      handleClick(e, <Admins />);
     }}
    >
     {lang.messages.find((m: any) => m.code.match(String(62)))?.message}
    </Link>
    <Link
     to="#"
     className="waves-effect waves-light option"
     onClick={(e) => {
      handleClick(e, <Laboratoire />);
     }}
    >
     {lang.messages.find((m: any) => m.code.match(String(54)))?.message}
    </Link>
   </div>
   <div className="options-main col l10 m9 s12 offset-m3 offset-l2">
    {state}
   </div>
  </div>
 );
};
const mapStateToProps = (state: AppState) => ({
 lang: state.lang.lang,
});
export default connect(mapStateToProps)(Options);
