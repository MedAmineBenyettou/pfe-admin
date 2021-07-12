import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import moment from 'moment';
import { useEffect } from 'react';
import Spinner from '../layout/Spinner';

export const Laboratoire = ({
 profile: { loading, profiles },
}: PropsFromRedux) => {
 useEffect(() => {}, []);

 const display = () =>
  profiles.map((p) => (
   <tr key={p._id}>
    <td>{}</td>
   </tr>
  ));

 if (loading) return <Spinner />;
 return (
  <div className="laboratoire">
   <p className="header-desc">
    Ajouter, modifier ou supprimer les types d'analyses proposer par le
    laboratoire
   </p>
   <h1 className="header">Laboratoire</h1>
   <div className="content row">
    <table className="striped centered col s12">
     <thead>
      <tr>
       <th></th>
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

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Laboratoire);
