import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setAlert } from '../../actions/alerts';
import { login } from '../../actions/auth';
import { AlertTypes } from '../../reducers/alerts';
import { getLangMessage } from '../../actions/lang';
import lock from '../../assets/lock.png';
import person from '../../assets/person.png';

import '../../css/Login/LForm.css';
import { Logo } from '../layout/Logo';

function Lform({ login, setAlert, getLangMessage }: ReduxProps) {
 const [formData, setFormData] = useState({ username: '', password: '' });
 const onSubmit = (e: any) => {
  e.preventDefault();
  if (password.length >= 6) {
   formData.username = formData.username.trim();
   login(formData);
  } else {
   setAlert(
    'Le mot de passe doit contenir au moins 6 caractères',
    AlertTypes.DANGER
   );
  }
 };

 const onChange = (e: any) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };
 const { username, password } = formData;
 return (
  <div className="login-form col s12 row">
   <div className="col s6 left-side">
    {/*//! Header */}
    <div className="LRheader col s12 container">
     <h3 className="col s12 ">{getLangMessage(6)}</h3>
    </div>
    <hr className="col s8 offset-s2" />
    <div className="Lform col s12">
     <form id="loginForm" className="col s12" onSubmit={onSubmit}>
      <div className="row">
       <div className="input-field col s11">
        <input
         name="username"
         placeholder={getLangMessage(14)}
         defaultValue={username}
         onChange={onChange}
         required
        />
        <div className="prefix">
         <img src={person} alt="mail" />
        </div>
       </div>
       <div id="lPassword" className="input-field col s11">
        <input
         type="password"
         name="password"
         placeholder={getLangMessage(15)}
         defaultValue={password}
         onChange={onChange}
         required
        />
        <div className="prefix">
         <img src={lock} alt="lock" />
        </div>
       </div>
      </div>
     </form>
     {/*//! down form  */}
     <div className=" col s12 valign-wrapper">
      <span>{getLangMessage(7)}</span>
      <button type="submit" form="loginForm" className="btn light-blue col s12">
       {getLangMessage(6)}
      </button>
     </div>
    </div>
   </div>
   <div className="col s6 right-side">
    <Logo />
    <p className="col s12 ">{getLangMessage(8)}</p>
   </div>
  </div>
 );
}

const mapDispatch = {
 login,
 setAlert,
 getLangMessage,
};

const connector = connect(null, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Lform);
