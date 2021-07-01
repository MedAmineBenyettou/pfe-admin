import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setAlert } from '../../actions/alerts';
import { login } from '../../actions/auth';
import { AlertTypes } from '../../reducers/alerts';
import lock from '../../assets/lock.png';
import person from '../../assets/person.png';

import '../../css/Login/LForm.css';

function Lform({ login, setAlert }: ReduxProps) {
 const [formData, setFormData] = useState({ username: '', password: '' });
 const onSubmit = (e: any) => {
  e.preventDefault();
  if (password.length >= 6) {
   formData.username = formData.username.trim().toLowerCase();
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
  <>
   {/*//! Header */}
   <div className="LRheader col s12 container">
    <h2 className="col s12 ">Se connecter</h2>
    <p className="col s12 ">Commencez votre journée productive</p>
   </div>
   <hr className="col s12" style={{ margin: '5px 0 20px 0' }} />
   <div className="Lform">
    <form id="loginForm" className="col s12" onSubmit={onSubmit}>
     <div className="row">
      <div className="input-field col s11">
       <input
        name="username"
        placeholder="Nom d'utilisateur"
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
        placeholder="Mot de passe"
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
     <button
      type="submit"
      form="loginForm"
      className="btn col s4 offset-s4 light-blue"
     >
      Se connecter
     </button>
    </div>
   </div>
  </>
 );
}

const mapDispatch = {
 login,
 setAlert,
};

const connector = connect(null, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Lform);
