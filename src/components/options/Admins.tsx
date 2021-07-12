import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import moment from 'moment';
import { useEffect } from 'react';
import { getAllProfiles } from '../../actions/profile';
import Spinner from '../layout/Spinner';

export const Admins = ({
 profile: { loading, profiles },
 getAllProfiles,
}: PropsFromRedux) => {
 useEffect(() => {
  getAllProfiles();
 }, [getAllProfiles]);

 const display = () =>
  profiles.map((p) => (
   <tr key={p._id}>
    <td>{p._id}</td>
    <td>{p.user.username}</td>
    <td>{p.nom}</td>
    <td>{p.prenom}</td>
    <td>{p.fonction}</td>
    <td>{p.phoneNumber}</td>
    <td>{moment(p.date).format('DD/MM/YYYY')}</td>
   </tr>
  ));

 if (loading) return <Spinner />;
 return (
  <div className="admins">
   <h1 className="header">Listes des administrateurs</h1>
   <div className="content row">
    <table className="striped centered col s12">
     <thead>
      <tr>
       <th>ID</th>
       <th>Nom d'utilisateur</th>
       <th>Nom</th>
       <th>Prenom</th>
       <th>Fonction</th>
       <th>Numéro de téléphone</th>
       <th>A rejoint le</th>
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

const mapDispatchToProps = { getAllProfiles };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Admins);
