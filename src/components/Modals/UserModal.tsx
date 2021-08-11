import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import lock from '../../assets/lock.png';
import person from '../../assets/person.png';
// import { register } from '../../actions/auth';
// import { updateProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { IUser, IUserProfile } from '../../reducers/userProfiles';
import { DatePicker } from '@material-ui/pickers';
import '../../css/modals/UserModal.css';

const UserModal = ({
 userProfiles: {
  targetUserProfile: { loading, userProfile },
 },
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
  initDateBirthPicker();
 }, [userProfile]);

 const selectBirthDateHandler = (date: Date) => {
  setFormData({ ...formData, dateOfBirth: date });
 };

 const initDateBirthPicker = () => {
  //   M.AutoInit();
  //   var elem = document.querySelectorAll('#UserModal-dateOfBirth');
  //   if (elem) {
  //    M.Datepicker.init(elem, {
  //     format: 'dd mmm, yyyy',
  //     defaultDate: dateOfBirth,
  //     onSelect: selectBirthDateHandler,
  //     container: document.getElementById('UserModal'),
  //    });
  //   }
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
  else if (e.target.name === 'username' || e.target.name === 'password') {
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
   //    updateProfileById(userProfile._id, { ...formData, user: fields }); //TODO
  } else {
   fields = {};
   fields.email = email;
   fields.password = password;
   fields.isEnabled = isEnabled;
   //    register(fields); //TODO
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
       {userProfile ? 'Modifier un' : 'Ajouter un nouveau'} compte de patient
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
         Nom d'utilisateur
        </label>
        <div className="prefix">
         <img src={person} alt="person" />
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
         Mot de passe
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
          Nom
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
          Prenom
         </label>
        </div>
        <div className="input-field col s12">
         <DatePicker
          value={dateOfBirth}
          name="dateOfBirth"
          id="UserModal-dateOfBirth"
          onChange={(d) => {
           if (d) setFormData({ ...formData, dateOfBirth: d });
          }}
          format={'dd MMMM yyyy'}
          autoOk={true}
          disableFuture={true}
         />
         <label htmlFor="UserModal-dateOfBirth" className="active">
          Date de naissance
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
          Numéro de téléphone
         </label>
        </div>
        {userProfile && (
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
        )}
       </div>
      }
     </div>
     <div className="modal-footer">
      <p className="red-text left">* sont nécéssaires</p>
      <button
       onClick={handleBtn}
       className="modal-close waves-effect waves-green btn-flat"
      >
       {userProfile ? 'Modifier' : 'Ajouter'}
      </button>
      <button
       onClick={close}
       className="modal-close waves-effect btn-flat white black-text"
      >
       Annuler
      </button>
     </div>
    </>
   )}
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 userProfiles: state.userProfile,
});

const mapDispatchToProps = {
 // updateProfileById,
 //  register
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserModal);
