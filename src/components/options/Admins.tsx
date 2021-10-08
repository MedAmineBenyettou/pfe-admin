import { connect, ConnectedProps } from 'react-redux';
import { Fragment } from 'react';
import { AppState } from '../../store';
import moment from 'moment';
import { useEffect } from 'react';
import { getAllProfiles, setTargetProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { IProfile } from '../../reducers/profile';
import M from 'materialize-css';
import { setTimeout } from 'timers';

export const Admins = ({
 profile: { loading, profiles, profile },
 getAllProfiles,
 setTargetProfile,
 lang,
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

 const display = () => {
  var res = profiles.map((p) => {
   if (profile && p._id !== profile._id) {
    return (
     <tr key={p._id} onClick={() => handleOnClick(p)}>
      <td>{p.user.username}</td>
      <td>{p.nom}</td>
      <td>{p.prenom}</td>
      <td>{p.fonction}</td>
      <td>{p.phoneNumber}</td>
      <td>{moment(p.date).format('DD/MM/YYYY')}</td>
      <td className={`${p.user.isEnabled ? 'green-text' : 'red-text'}`}>
       {p.user.isEnabled
        ? lang.messages.find((m) => m.code.match(String(28)))?.message
        : lang.messages.find((m) => m.code.match(String(47)))?.message}
      </td>
     </tr>
    );
   } else return <Fragment key={'id'}></Fragment>;
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
  <div className="admins">
   <div className="header">
    <h1>{lang.messages.find((m) => m.code.match(String(49)))?.message}</h1>
    <a
     className="btn light-green waves-effect waves-light right modal-trigger"
     href="#AdminModal"
    >
     {lang.messages.find((m) => m.code.match(String(50)))?.message}
    </a>
   </div>
   <div className="content row">
    <table className="striped centered col s12">
     <thead>
      <tr>
       {/* <th>ID</th> */}
       <th>{lang.messages.find((m) => m.code.match(String(14)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(18)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(24)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(26)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(45)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(52)))?.message}</th>
       <th>{lang.messages.find((m) => m.code.match(String(51)))?.message}</th>
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
 lang: state.lang.lang,
});

const mapDispatchToProps = { getAllProfiles, setTargetProfile };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Admins);
