import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import lock from '../../assets/lock.png';
import person from '../../assets/person.png';
import { register } from '../../actions/auth';
import { updateProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import '../../css/modals/AdminModal.css';

const AdminModal = ({
 profile: {
  targetProfile: { loading, profile },
 },
 updateProfileById,
 register,
 lang,
}: PropsFromRedux) => {
 const [authForm, setAuthForm] = useState<{
  username?: string;
  password?: string;
  isEnabled?: boolean;
 }>({
  username: profile ? profile.user.username : '',
  isEnabled: profile ? profile.user.isEnabled : false,
  password: '',
 });

 const [formData, setFormData] = useState({
  nom: profile ? profile.nom : '',
  prenom: profile ? profile.prenom : '',
  fonction: profile ? profile.fonction : '',
  phoneNumber: profile ? profile.phoneNumber : '',
 });

 useEffect(() => {
  setFormData({
   nom: profile ? profile.nom : '',
   prenom: profile ? profile.prenom : '',
   fonction: profile ? profile.fonction : '',
   phoneNumber: profile ? profile.phoneNumber : '',
  });
  setAuthForm({
   username: profile ? profile.user.username : '',
   isEnabled: profile ? profile.user.isEnabled : false,
  });
 }, [profile]);

 const { fonction, nom, prenom, phoneNumber } = formData;
 const { username, password, isEnabled } = authForm;

 const close = () => {
  var elmnt = document.getElementById('AdminModal');
  if (elmnt) {
   var inst = M.Modal.getInstance(elmnt);
   inst.close();
  }
 };

 const onChange = (e: any) => {
  if (e.target.name === 'isEnabled')
   setAuthForm({ ...authForm, isEnabled: !isEnabled });
  else if (e.target.name === 'username' || e.target.name === 'password') {
   setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  } else setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleBtn = (e: any) => {
  var fields: any = {};
  if (profile) {
   if (username && username.length > 0 && username !== profile.user.username)
    fields.username = username;
   if (password && password.length >= 6) fields.password = password;
   fields.isEnabled = isEnabled;
   updateProfileById(profile._id, { ...formData, user: fields });
  } else {
   fields = {};
   fields.username = username;
   fields.password = password;
   fields.isEnabled = isEnabled;
   register(fields);
  }
 };

 return (
  <div id="AdminModal" className="modal modal-fixed-footer">
   {loading ? (
    <Spinner />
   ) : (
    <>
     <div className="modal-content">
      <h4>
       {profile
        ? lang.messages.find((m) => m.code.match(String(16)))?.message
        : lang.messages.find((m) => m.code.match(String(17)))?.message}{' '}
       {lang.messages.find((m) => m.code.match(String(23)))?.message}
      </h4>
      <div className="row">
       <div className="input-field col s12">
        <input
         name="username"
         id="AdminModal-username"
         defaultValue={username}
         onChange={onChange}
         type="text"
         autoComplete="false"
        />
        <label htmlFor="AdminModal-username" className="active">
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
         id="AdminModal-password"
         defaultValue={password}
         onChange={onChange}
         autoComplete="false"
         minLength={6}
        />
        <label htmlFor="AdminModal-password" className="active">
         {lang.messages.find((m) => m.code.match(String(15)))?.message}
        </label>
        <div className="prefix">
         <img src={lock} alt="lock" />
        </div>
       </div>
      </div>
      <div className="divider"></div>
      {profile && (
       <div className="form row">
        <div className="input-field col s12">
         <input
          name="nom"
          id="AdminModal-nom"
          type="text"
          defaultValue={nom}
          onChange={onChange}
         />
         <label htmlFor="AdminModal-nom" className="active">
          {lang.messages.find((m) => m.code.match(String(18)))?.message}
         </label>
        </div>
        <div className="input-field col s12">
         <input
          name="prenom"
          id="AdminModal-prenom"
          type="text"
          defaultValue={prenom}
          onChange={onChange}
         />
         <label htmlFor="AdminModal-prenom" className="active">
          {lang.messages.find((m) => m.code.match(String(24)))?.message}
         </label>
        </div>
        <div className="input-field col s12">
         <input
          name="phoneNumber"
          id="AdminModal-phoneNumber"
          type="text"
          defaultValue={phoneNumber}
          onChange={onChange}
         />
         <label htmlFor="AdminModal-phoneNumber" className="active">
          {lang.messages.find((m) => m.code.match(String(25)))?.message}
         </label>
        </div>
        <div className="input-field col s12">
         <input
          name="fonction"
          id="AdminModal-fonction"
          type="text"
          defaultValue={fonction}
          onChange={onChange}
         />
         <label htmlFor="AdminModal-fonction" className="active">
          {lang.messages.find((m) => m.code.match(String(26)))?.message}
         </label>
        </div>
        <div className="switch">
         <label>
          {lang.messages.find((m) => m.code.match(String(27)))?.message}
          <input
           name="isEnabled"
           type="checkbox"
           checked={isEnabled ? true : false}
           value={'isEnabled'}
           onChange={onChange}
          />
          <span className="lever"></span>
          {lang.messages.find((m) => m.code.match(String(28)))?.message}
         </label>
        </div>
       </div>
      )}
     </div>
     <div className="modal-footer">
      <p className="red-text left">
       * {lang.messages.find((m) => m.code.match(String(20)))?.message}
      </p>
      <button
       onClick={handleBtn}
       className="modal-close waves-effect waves-green btn-flat"
      >
       {profile
        ? lang.messages.find((m) => m.code.match(String(16)))?.message
        : lang.messages.find((m) => m.code.match(String(17)))?.message}
      </button>
      <button
       onClick={close}
       className="modal-close waves-effect btn-flat white black-text"
      >
       {lang.messages.find((m) => m.code.match(String(22)))?.message}
      </button>
     </div>
    </>
   )}
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 profile: state.profile,
 lang: state.lang.lang,
});

const mapDispatchToProps = { updateProfileById, register };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AdminModal);
