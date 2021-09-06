import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import moment from 'moment';
import { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import M from 'materialize-css';
import { setTimeout } from 'timers';
import {
 setTargetUserProfile,
 getAllUsersProfiles,
} from '../../actions/userProfiles';
import { IUserProfile } from '../../reducers/userProfiles';

import '../../css/patients/patients.css';

export const Patients = ({
 profile: { loading, userProfiles },
 setTargetUserProfile,
 getAllUsersProfiles,
}: PropsFromRedux) => {
 useEffect(() => {
  getAllUsersProfiles();
 }, [getAllUsersProfiles]);

 const handleOnClick = (p: IUserProfile) => {
  setTargetUserProfile(p);
  setTimeout(() => {
   var elmnt = document.getElementById('UserModal');
   if (elmnt) {
    var inst = M.Modal.getInstance(elmnt);
    inst.options = {
     ...inst.options,
     dismissible: true,
     onCloseEnd: () => {
      setTargetUserProfile(null);
     },
    };
    inst.open();
   }
  }, 1000);
 };

 const display = () => {
  var res = userProfiles.map((p) => {
   return (
    <tr key={p._id} onClick={() => handleOnClick(p)}>
     <td>{p.nom}</td>
     <td>{p.prenom}</td>
     <td>{p.user.email}</td>
     <td>{p.adresse}</td>
     <td>
      {moment(p.dateOfBirth).format('DD/MM/YYYY')} à {p.birthLocation}
     </td>
     <td>{p.phoneNumber}</td>
     <td>{moment(p.date).format('DD/MM/YYYY')}</td>
     {/* <td className={`${p.user.isEnabled ? 'green-text' : 'red-text'}`}>
       {p.user.isEnabled ? 'Activé' : 'Desactivé'}
      </td> */}
    </tr>
   );
  });
  if (res.length > 0) return res;
  return (
   <tr>
    <td></td>
    <td></td>
    <td></td>
    <td className="error">Pas d'utilisateur</td>
    <td></td>
    <td></td>
    <td></td>
   </tr>
  );
 };

 if (loading) return <Spinner />;
 return (
  <div className="patients">
   <div className="header">
    <h1>Listes des patients</h1>
    <a
     className="btn light-green waves-effect waves-light right modal-trigger"
     href="#UserModal"
    >
     Ajouter un compte patient
    </a>
   </div>
   <div className="content row">
    <table className="striped centered col s12">
     <thead>
      <tr>
       {/* <th>ID</th> */}
       <th>Nom</th>
       <th>Prenom</th>
       <th>Email</th>
       <th>Adresse</th>
       <th>Date et Lieu de naissance</th>
       <th>Numéro de téléphone</th>
       <th>Crée le</th>
       {/* <th>Etat</th> */}
      </tr>
     </thead>
     <tbody>{display()}</tbody>
    </table>
   </div>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 profile: state.userProfile,
});

const mapDispatchToProps = { setTargetUserProfile, getAllUsersProfiles };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Patients);
