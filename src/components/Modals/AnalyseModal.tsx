import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';
import M from 'materialize-css';
import '../../css/modals/AnalyseModal.css';
import { setTargetUserProfile } from '../../actions/userProfiles';

const AnalyseModal = ({
 analyses: {
  selection: { analyse },
  loading,
  genes,
  types,
 },
 setTargetUserProfile,
}: PropsFromRedux) => {
 //  const [form, setForm] = useState({
 //   nom: analyse ? analyse.nom : '',
 //   description: analyse ? (analyse.description ? analyse.description : '') : '',
 //  });

 //  useEffect(() => {
 //   if (analyse && !loading)
 //    setForm({
 //     nom: analyse.nom,
 //     description: analyse.description ? analyse.description : '',
 //    });
 //   else
 //    setForm({
 //     nom: '',
 //     description: '',
 //    });
 //  }, [analyse, loading]);

 //  const { nom, description } = form;

 //  const onChange = (e: any) => {
 //   setForm({ ...form, [e.target.name]: e.target.value });
 //  };

 const handleClick = () => {
  // if (analyse) updateAnalyse(analyse._id, form);
  // else addGene(form);
 };

 const close = () => {
  var elmnt = document.getElementById('AnalyseModal');
  if (elmnt) {
   var inst = M.Modal.getInstance(elmnt);
   inst.close();
  }
 };

 const openUserModal = () => {
  var elmnt = document.getElementById('UserModal');
  if (elmnt) {
   var inst = M.Modal.init(elmnt, {
    dismissible: true,
    onCloseEnd: () => {
     setTargetUserProfile(null);
    },
   });
   inst.open();
  }
 };

 return (
  <div id="AnalyseModal" className="modal modal-fixed-footer">
   {loading ? (
    <Spinner />
   ) : (
    <>
     <div className="modal-content">
      <h4>{analyse ? 'Modifier' : 'Ajouter'} une analyse</h4>
      <ul className="tabs tabs-fixed-width z-depth-1">
       <li className="tab">
        <a className="active" href="#lier-compte">
         Lier un compte
        </a>
       </li>
       <li className="tab">
        <a href="#creer-compte">Nouveau Compte</a>
       </li>
      </ul>
      <div id="lier-compte" className="col s12">
       <p>Lier un compte</p>
      </div>
      <div id="creer-compte" className="col s12">
       <button
        className="btn btn-flat waves-effect blue"
        onClick={openUserModal}
       >
        Nouveau Compte
       </button>
      </div>
     </div>
     <div className="modal-footer">
      <p className="red-text left">* sont nécéssaires</p>
      <button
       className="modal-close waves-effect waves-green btn-flat"
       onClick={handleClick}
      >
       {analyse ? 'Modifier' : 'Ajouter'}
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
 analyses: state.analyses,
});

const mapDispatchToProps = { setTargetUserProfile };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnalyseModal);
