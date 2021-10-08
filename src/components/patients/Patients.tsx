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
 lang,
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
    <td className="error">
     {lang.messages.find((m) => m.code.match(String(48)))?.message}
    </td>
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
    <h1>{lang.messages.find((m) => m.code.match(String(66)))?.message}</h1>
    <a
     className="btn light-green waves-effect waves-light right modal-trigger"
     href="#UserModal"
    >
     {lang.messages.find((m) => m.code.match(String(67)))?.message}
    </a>
   </div>
   <div className="content row">
    <table className="striped centered col s12">
     <thead>
      <tr>
       {/* <th>ID</th> */}
       <th>{lang.messages.find((m) => m.code.match(String(18)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(24)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(43)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(46)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(68)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(25)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(69)))?.message}</th>
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
 lang: state.lang.lang,
});

const mapDispatchToProps = {
 setTargetUserProfile,
 getAllUsersProfiles,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Patients);
