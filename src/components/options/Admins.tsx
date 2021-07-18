import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import moment from 'moment';
import { useEffect } from 'react';
import { getAllProfiles, setTargetProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { IProfile } from '../../reducers/profile';
import M from 'materialize-css';
import { setTimeout } from 'timers';

export const Admins = ({
 profile: { loading, profiles },
 getAllProfiles,
 setTargetProfile,
}: PropsFromRedux) => {
 useEffect(() => {
  getAllProfiles();
 }, [getAllProfiles]);

 const handleOnClick = (p: IProfile) => {
  setTargetProfile(p);
  setTimeout(() => {
   var elmnt = document.getElementById('AdminModal');
   if (elmnt) {
    var inst = M.Modal.getInstance(elmnt);
    inst.options = {
     ...inst.options,
     dismissible: true,
     onCloseEnd: () => {
      setTargetProfile(null);
     },
    };
    inst.open();
   }
  }, 1000);
 };

 const display = () =>
  profiles.map((p) => (
   <tr
    // className="modal-trigger"
    // //@ts-ignore
    // href="#AdminModal"
    key={p._id}
    onClick={() => handleOnClick(p)}
   >
    <td>{p.user.username}</td>
    <td>{p.nom}</td>
    <td>{p.prenom}</td>
    <td>{p.fonction}</td>
    <td>{p.phoneNumber}</td>
    <td>{moment(p.date).format('DD/MM/YYYY')}</td>
    <td className={`${p.user.isEnabled ? 'green-text' : 'red-text'}`}>
     {p.user.isEnabled ? 'Activé' : 'Desactivé'}
    </td>
   </tr>
  ));

 if (loading) return <Spinner />;
 return (
  <div className="admins">
   <div className="header">
    <h1>Listes des administrateurs</h1>
    <a
     className="btn light-green waves-effect waves-light right modal-trigger"
     href="#AdminModal"
    >
     Ajouter un administrateur
    </a>
   </div>
   <div className="content row">
    <table className="striped centered col s12">
     <thead>
      <tr>
       {/* <th>ID</th> */}
       <th>Nom d'utilisateur</th>
       <th>Nom</th>
       <th>Prenom</th>
       <th>Fonction</th>
       <th>Numéro de téléphone</th>
       <th>A rejoint le</th>
       <th>Etat</th>
      </tr>
     </thead>
     <tbody>{display()}</tbody>
    </table>
   </div>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 profile: state.profile,
});

const mapDispatchToProps = { getAllProfiles, setTargetProfile };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Admins);
