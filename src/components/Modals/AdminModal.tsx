import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import lock from '../../assets/lock.png';
import person from '../../assets/person.png';
import { register } from '../../actions/auth';
import { updateProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import '../../css/modals/AdminModal.css';
import { getLangMessage } from '../../actions/lang';

const AdminModal = ({
 profile: {
  targetProfile: { loading, profile },
 },
 updateProfileById,
 register,
 getLangMessage,
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
       {profile ? getLangMessage(16) : getLangMessage(17)} {getLangMessage(23)}
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
         {getLangMessage(14)}
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
         {getLangMessage(15)}
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
          {getLangMessage(18)}
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
          {getLangMessage(24)}
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
          {getLangMessage(25)}
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
          {getLangMessage(26)}
         </label>
        </div>
        <div className="switch">
         <label>
          {getLangMessage(27)}
          <input
           name="isEnabled"
           type="checkbox"
           checked={isEnabled ? true : false}
           value={'isEnabled'}
           onChange={onChange}
          />
          <span className="lever"></span>
          {getLangMessage(28)}
         </label>
        </div>
       </div>
      )}
     </div>
     <div className="modal-footer">
      <p className="red-text left">* {getLangMessage(20)}</p>
      <button
       onClick={handleBtn}
       className="modal-close waves-effect waves-green btn-flat"
      >
       {profile ? getLangMessage(16) : getLangMessage(17)}
      </button>
      <button
       onClick={close}
       className="modal-close waves-effect btn-flat white black-text"
      >
       {getLangMessage(22)}
      </button>
     </div>
    </>
   )}
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 profile: state.profile,
});

const mapDispatchToProps = { updateProfileById, register, getLangMessage };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AdminModal);
