import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';

import lock from '../../assets/lock.png';
import person from '../../assets/person.png';
import Spinner from '../../components/layout/Spinner';
import { updateProfile } from '../../actions/profile';
import { updateUser } from '../../actions/auth';

export const Profil = ({
 profile: { profile, error, loading },
 auth,
 updateProfile,
 updateUser,
 lang,
}: PropsFromRedux) => {
 const [authData, setAuthData] = useState<{
  username?: string;
  password?: string;
 }>({
  username: auth.user?.username,
  password: '',
 });

 const [formData, setFormData] = useState({
  nom: profile ? profile.nom : '',
  prenom: profile ? profile.prenom : '',
  fonction: profile ? profile.fonction : '',
  phoneNumber: profile ? profile.phoneNumber : '',
 });

 const handleProfile = (e: any) => {
  e.preventDefault();
  updateProfile(formData);
 };
 const handleAuth = (e: any) => {
  e.preventDefault();
  var fields: any = {};
  fields.username = authData.username;
  if (authData.password && authData.password.length !== 0)
   fields.password = authData.username;
  updateUser(fields);
 };

 if (!error && !loading) {
  const onChange = (e: any) => {
   if (e.target.name === 'username' || e.target.name === 'password')
    setAuthData({ ...authData, [e.target.name]: e.target.value });
   else setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { fonction, nom, prenom, phoneNumber } = formData;
  const { username, password } = authData;
  return (
   <div className="profil">
    <h1 className="header">
     {lang.messages.find((m) => m.code.match(String(63)))?.message} :
    </h1>
    <div className="content">
     <div className="row">
      <div className="input-field col s12">
       <input
        name="nom"
        id="nom"
        type="text"
        defaultValue={nom}
        onChange={onChange}
       />
       <label htmlFor="nom" className="active">
        {lang.messages.find((m) => m.code.match(String(18)))?.message}
       </label>
      </div>
      <div className="input-field col s12">
       <input
        name="prenom"
        id="prenom"
        type="text"
        defaultValue={prenom}
        onChange={onChange}
       />
       <label htmlFor="prenom" className="active">
        {lang.messages.find((m) => m.code.match(String(24)))?.message}
       </label>
      </div>
      <div className="input-field col s12">
       <input
        name="phoneNumber"
        id="phoneNumber"
        type="text"
        defaultValue={phoneNumber}
        onChange={onChange}
       />
       <label htmlFor="phoneNumber" className="active">
        {lang.messages.find((m) => m.code.match(String(25)))?.message}
       </label>
      </div>
      <div className="input-field col s12">
       <input
        name="fonction"
        id="fonction"
        type="text"
        defaultValue={fonction}
        onChange={onChange}
       />
       <label htmlFor="fonction" className="active">
        {lang.messages.find((m) => m.code.match(String(26)))?.message}
       </label>
      </div>
      <div className=" col s12 valign-wrapper">
       <button
        form="profilForm"
        className="btn col m4 s5 offset-m8 offset-s7 light-blue"
        onClick={handleProfile}
       >
        {lang.messages.find((m) => m.code.match(String(64)))?.message}
       </button>
      </div>
     </div>
     <div className="divider"></div>
     <div className="row">
      <h1 className="header">
       {lang.messages.find((m) => m.code.match(String(65)))?.message}
      </h1>
     </div>
     <div className="row">
      <div className="input-field col s12">
       <input
        name="username"
        id="username"
        defaultValue={username}
        onChange={onChange}
        minLength={6}
        type="text"
        autoComplete="false"
       />
       <label htmlFor="username" className="active">
        {lang.messages.find((m) => m.code.match(String(14)))?.message}
       </label>
       <div className="prefix">
        <img src={person} alt="person" />
       </div>
      </div>
      <div id="lPassword" className="input-field col s12">
       <input
        type="password"
        name="password"
        id="password"
        defaultValue={password}
        onChange={onChange}
        autoComplete="false"
        minLength={6}
       />
       <label htmlFor="password" className="active">
        {lang.messages.find((m) => m.code.match(String(15)))?.message}
       </label>
       <div className="prefix">
        <img src={lock} alt="lock" />
       </div>
      </div>
      <div className=" col s12 valign-wrapper">
       <button
        form="authForm"
        className="btn col m4 s5 offset-m8 offset-s7 light-blue"
        onClick={handleAuth}
       >
        {lang.messages.find((m) => m.code.match(String(64)))?.message}
       </button>
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
 lang: state.lang.lang,
});

const mapDispatchToProps = { updateProfile, updateUser };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Profil);
