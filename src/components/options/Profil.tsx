import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { setAlert } from '../../actions/alerts';
import { AlertTypes } from '../../reducers/alerts';
import { AppState } from '../../store';

import lock from '../../assets/lock.png';
import person from '../../assets/person.png';
import Spinner from '../../components/layout/Spinner';

export const Profil = ({
 profile: { profile, error, loading },
}: PropsFromRedux) => {
 const [formData, setFormData] = useState({ ...profile });
 const onSubmit = (e: any) => {
  e.preventDefault();
  //     //TODO add update function
  //  if (password.length >= 6) {
  //   formData.username = formData.username.trim().toLowerCase();
  // } else {
  //   setAlert(
  //    'Le mot de passe doit contenir au moins 6 caractères',
  //    AlertTypes.DANGER
  //   );
  //  }
 };

 if (!error && !loading && formData.user) {
  const onChange = (e: any) => {
   if (e.target.name === 'username')
    setFormData({ ...formData, user: { username: e.target.value } });
   else setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { username } = formData.user;
  const { fonction, nom, prenom, phoneNumber } = formData;
  return (
   <div className="profil">
    <h1 className="header">Profil</h1>
    <div className="content">
     <div className="row">
      <div className="input-field col s11">
       <input
        name="username"
        placeholder="Username"
        defaultValue={username}
        onChange={onChange}
        minLength={6}
       />
       <div className="prefix">
        <img src={person} alt="person" />
       </div>
      </div>
      <div className="input-field col s11">
       <input
        name="nom"
        placeholder="Nom de l'utilisateur"
        defaultValue={nom}
        onChange={onChange}
       />
      </div>
      <div className="input-field col s11">
       <input
        name="prenom"
        placeholder="Prenom de l'utilisateur"
        defaultValue={prenom}
        onChange={onChange}
       />
      </div>
      <div className="input-field col s11">
       <input
        name="phoneNumber"
        placeholder="Numéro de téléphone"
        defaultValue={phoneNumber}
        onChange={onChange}
       />
      </div>
      <div className="input-field col s11">
       <input
        name="fonction"
        placeholder="Fonction de l'utilisateur"
        defaultValue={fonction}
        onChange={onChange}
       />
      </div>
     </div>
     <div className="row">
      <h1 className="header">Avancé</h1>
     </div>
     <div className="row">
      <div id="lPassword" className="input-field col s11">
       {' '}
       //TODO add edit password for auth
       <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        //    defaultValue={password}
        onChange={onChange}
        required
       />
       <div className="prefix">
        <img src={lock} alt="lock" />
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 } else return <Spinner />;
};

const mapStateToProps = (state: AppState) => ({
 auth: state.auth,
 profile: state.profile,
});

const mapDispatchToProps = {}; //TODO add update function

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Profil);
