import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import lock from '../../assets/lock.png';
import mail from '../../assets/mail.png';
import Spinner from '../layout/Spinner';
import { IUser, IUserProfile } from '../../reducers/userProfiles';
import { DatePicker } from '@material-ui/pickers';
import '../../css/modals/UserModal.css';
import { registerUser } from '../../actions/user';
import { updateUserProfileById } from '../../actions/userProfiles';
import { setAlert } from '../../actions/alerts';
import { AlertTypes } from '../../reducers/alerts';

const UserModal = ({
 userProfiles: {
  targetUserProfile: { loading, userProfile },
 },
 registerUser,
 updateUserProfileById,
 setAlert,
 lang,
}: PropsFromRedux) => {
 const [authForm, setAuthForm] = useState<
  Pick<IUser, 'email' | 'isEnabled'> & { password: string }
 >({
  email: userProfile ? userProfile.user.email : '',
  isEnabled: userProfile ? userProfile.user.isEnabled : true,
  password: '',
 });

 const [formData, setFormData] = useState<
  Omit<IUserProfile, '_id' | 'user' | 'date'>
 >({
  nom: userProfile ? userProfile.nom : '',
  prenom: userProfile ? userProfile.prenom : '',
  phoneNumber: userProfile ? userProfile.phoneNumber : '',
  adresse: userProfile ? userProfile.adresse : '',
  birthLocation: userProfile ? userProfile.birthLocation : '',
  dateOfBirth: userProfile ? userProfile.dateOfBirth : new Date(),
 });

 const { nom, prenom, phoneNumber, adresse, birthLocation, dateOfBirth } =
  formData;
 const { email, password, isEnabled } = authForm;

 useEffect(() => {
  setFormData({
   nom: userProfile ? userProfile.nom : '',
   prenom: userProfile ? userProfile.prenom : '',
   phoneNumber: userProfile ? userProfile.phoneNumber : '',
   adresse: userProfile ? userProfile.adresse : '',
   birthLocation: userProfile ? userProfile.birthLocation : '',
   dateOfBirth: userProfile ? userProfile.dateOfBirth : new Date(),
  });
  setAuthForm({
   email: userProfile ? userProfile.user.email : '',
   isEnabled: userProfile ? userProfile.user.isEnabled : true,
   password: '',
  });
 }, [userProfile]);

 const selectBirthDateHandler = (date: Date) => {
  setFormData({ ...formData, dateOfBirth: date });
 };

 const close = () => {
  var elmnt = document.getElementById('UserModal');
  if (elmnt) {
   var inst = M.Modal.getInstance(elmnt);
   inst.close();
  }
 };

 const onChange = (e: any) => {
  if (e.target.name === 'isEnabled')
   setAuthForm({ ...authForm, isEnabled: !isEnabled });
  else if (e.target.name === 'email' || e.target.name === 'password') {
   setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  } else setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleBtn = (e: any) => {
  var fields: any = {};
  if (userProfile) {
   if (email && email.length > 0 && email !== userProfile.user.email)
    fields.email = email;
   if (password && password.length >= 6) fields.password = password;
   fields.isEnabled = isEnabled;
   updateUserProfileById(userProfile._id, { ...formData, user: fields });
  } else {
   if (!(password && password.length >= 6))
    setAlert('Le mot de passe doit contenir 6 caractères', AlertTypes.WARNING);
   else {
    registerUser({ ...formData, ...authForm });
   }
  }
 };

 return (
  <div id="UserModal" className="modal modal-fixed-footer">
   {loading ? (
    <Spinner />
   ) : (
    <>
     <div className="modal-content">
      <h4>
       {userProfile
        ? lang.messages.find((m) => m.code.match(String(41)))?.message
        : lang.messages.find((m) => m.code.match(String(42)))?.message}
      </h4>
      <div className="row">
       <div className="input-field col s12">
        <input
         name="email"
         id="UserModal-email"
         defaultValue={email}
         onChange={onChange}
         type="text"
         autoComplete="false"
        />
        <label htmlFor="UserModal-email" className="active">
         {lang.messages.find((m) => m.code.match(String(43)))?.message}*
        </label>
        <div className="prefix">
         <img src={mail} alt="mail" />
        </div>
       </div>
       <div id="lPassword" className="input-field col s12">
        <input
         type="password"
         name="password"
         id="UserModal-password"
         defaultValue={password}
         onChange={onChange}
         autoComplete="false"
         minLength={6}
        />
        <label htmlFor="UserModal-password" className="active">
         {lang.messages.find((m) => m.code.match(String(15)))?.message}*
        </label>
        <div className="prefix">
         <img src={lock} alt="lock" />
        </div>
       </div>
      </div>
      <div className="divider"></div>
      {
       <div className="form row">
        <div className="input-field col s12">
         <input
          name="nom"
          id="UserModal-nom"
          type="text"
          defaultValue={nom}
          onChange={onChange}
         />
         <label htmlFor="UserModal-nom" className="active">
          {lang.messages.find((m) => m.code.match(String(18)))?.message}*
         </label>
        </div>
        <div className="input-field col s12">
         <input
          name="prenom"
          id="UserModal-prenom"
          type="text"
          defaultValue={prenom}
          onChange={onChange}
         />
         <label htmlFor="UserModal-prenom" className="active">
          {lang.messages.find((m) => m.code.match(String(24)))?.message}*
         </label>
        </div>
        <div className="input-field col s5">
         <DatePicker
          value={dateOfBirth}
          name="dateOfBirth"
          id="UserModal-dateOfBirth"
          onChange={(d) => {
           if (d) selectBirthDateHandler(d);
          }}
          format={'dd MMMM yyyy'}
          autoOk={true}
          disableFuture={true}
         />
         <label htmlFor="UserModal-dateOfBirth" className="active">
          {lang.messages.find((m) => m.code.match(String(44)))?.message}*
         </label>
        </div>
        <div className="input-field col s5 offset-s1">
         <input
          name="birthLocation"
          id="UserModal-birthLocation"
          type="text"
          defaultValue={birthLocation}
          onChange={onChange}
         />
         <label htmlFor="UserModal-birthLocation" className="active">
          {lang.messages.find((m) => m.code.match(String(45)))?.message}*
         </label>
        </div>
        <div className="input-field col s12">
         <input
          name="phoneNumber"
          id="UserModal-phoneNumber"
          type="text"
          defaultValue={phoneNumber}
          onChange={onChange}
         />
         <label htmlFor="UserModal-phoneNumber" className="active">
          {lang.messages.find((m) => m.code.match(String(25)))?.message}*
         </label>
        </div>
        <div className="input-field col s12">
         <input
          name="adresse"
          id="UserModal-adresse"
          type="text"
          defaultValue={adresse}
          onChange={onChange}
         />
         <label htmlFor="UserModal-adresse" className="active">
          {lang.messages.find((m) => m.code.match(String(46)))?.message}*
         </label>
        </div>
        {/* {userProfile && (
         <div className="switch">
          <label>
           Compte: Desactivé
           <input
            name="isEnabled"
            type="checkbox"
            checked={isEnabled ? true : false}
            value={'isEnabled'}
            onChange={onChange}
           />
           <span className="lever"></span>
           Activé
          </label>
         </div>
        )} */}
       </div>
      }
     </div>
     <div className="modal-footer">
      <p className="red-text left">
       * {lang.messages.find((m) => m.code.match(String(20)))?.message}
      </p>
      <button
       onClick={handleBtn}
       className="modal-close waves-effect waves-green btn-flat"
      >
       {userProfile
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
 userProfiles: state.userProfile,
 lang: state.lang.lang,
});

const mapDispatchToProps = {
 updateUserProfileById,
 setAlert,
 registerUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserModal);
