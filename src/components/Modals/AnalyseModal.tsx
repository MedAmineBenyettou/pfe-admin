import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';
import M from 'materialize-css';
import '../../css/modals/AnalyseModal.css';
import { setTargetUserProfile } from '../../actions/userProfiles';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import {
 addAnalyse,
 AnalyseStateForm,
 updateAnalyseById,
} from '../../actions/analyses';

const AnalyseModal = ({
 analyses: {
  selection: { analyse },
  loading,
  types,
 },
 profiles,
 setTargetUserProfile,
 updateAnalyseById,
 addAnalyse,
}: PropsFromRedux) => {
 const [form, setForm] = useState<AnalyseStateForm>({
  description: analyse ? analyse.description : '',
  locationDePrelevement: analyse ? analyse.locationDePrelevement : '',
  type: analyse ? analyse.type._id : '',
  patient: analyse ? analyse.patient._id : '',
  notes: analyse ? analyse.notes : '',
  etat: analyse ? analyse.etat : -1,
  positive: analyse ? analyse.positive : false,
 });

 useEffect(() => {
  if (analyse && !loading)
   setForm({
    description: analyse ? analyse.description : '',
    locationDePrelevement: analyse ? analyse.locationDePrelevement : '',
    type: analyse ? analyse.type._id : '',
    patient: analyse ? analyse.patient._id : '',
    notes: analyse ? analyse.notes : '',
    etat: analyse ? analyse.etat : -1,
    positive: analyse ? analyse.positive : false,
   });
  else
   setForm({
    description: '',
    locationDePrelevement: '',
    type: '',
    patient: '',
    notes: '',
    etat: -1,
    positive: false,
   });
 }, [analyse, loading]);

 const {
  description,
  locationDePrelevement,
  type,
  patient,
  notes,
  etat,
  positive,
 } = form;

 const onChange = (e: any) => {
  if (e.target.name === 'positive') setForm({ ...form, positive: !positive });
  else setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleClick = () => {
  if (analyse) updateAnalyseById(analyse._id, form);
  else addAnalyse(form);
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

 const displayUsersEmails = () => {
  if (profiles)
   if (profiles.length > 0)
    return (
     <Select
      value={patient}
      labelId="input_compte_client"
      name="patient"
      onChange={onChange}
     >
      {profiles.map((p) => (
       <MenuItem key={p._id} value={p._id}>
        {p.user.email}({p.nom + ' ' + p.prenom})
       </MenuItem>
      ))}
     </Select>
    );
   else return <p>Pas de comptes patients :/</p>;
  else return <Spinner />;
 };

 const displayAnalyseTypes = () => {
  if (types)
   if (types.length > 0)
    return (
     <Select value={type} labelId="input_type" name="type" onChange={onChange}>
      {types.map((t) => (
       <MenuItem key={t._id} value={t._id} /*about={t.description}*/>
        {t.nom}
       </MenuItem>
      ))}
     </Select>
    );
   else return <p>Pas de types d'analyses :/</p>;
  else return <Spinner />;
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
       <FormControl className="col s12">
        <InputLabel id="input_compte_client">Compte du patient</InputLabel>
        {displayUsersEmails()}
       </FormControl>
      </div>
      <div id="creer-compte" className="col s12">
       <button
        className="btn btn-flat waves-effect blue"
        onClick={openUserModal}
       >
        Nouveau Compte
       </button>
      </div>
      <div className="main-form">
       <FormControl className="col s12">
        <InputLabel id="input_type">Type d'analyse</InputLabel>
        {displayAnalyseTypes()}
       </FormControl>
       <div className="input-field col s12">
        <input
         name="locationDePrelevement"
         id="analyseModal-locationDePrelevement"
         type="text"
         defaultValue={locationDePrelevement}
         onChange={onChange}
        />
        <label htmlFor="analyseModal-locationDePrelevement" className="active">
         Location Du Prélèvement*
        </label>
       </div>
       <div className="input-field col s12">
        <textarea
         className="materialize-textarea"
         name="description"
         id="analyseModal-description"
         //  type="text"
         defaultValue={description}
         onChange={onChange}
        />
        <label htmlFor="analyseModal-description" className="active">
         Description
        </label>
       </div>
       <div className="input-field col s12">
        <textarea
         className="materialize-textarea"
         name="notes"
         id="analyseModal-notes"
         //  type="text"
         defaultValue={notes}
         onChange={onChange}
        />
        <label htmlFor="analyseModal-notes" className="active">
         Notes
        </label>
       </div>
       <FormControl className="col s12">
        <InputLabel id="input_etat">Etat de l'analyse</InputLabel>
        <Select
         name="etat"
         value={etat}
         onChange={onChange}
         labelId="input_etat"
        >
         <MenuItem value={-1}>En attente</MenuItem>
         <MenuItem value={0}>En cours de traitement</MenuItem>
         <MenuItem value={1}>Terminé</MenuItem>
        </Select>
       </FormControl>
       <div className="switch">
        <label>
         Positive
         <input
          name="positive"
          type="checkbox"
          checked={positive}
          onChange={onChange}
         />
         <span className="lever"></span>
        </label>
       </div>
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
 profiles: state.userProfile.userProfiles,
});

const mapDispatchToProps = {
 setTargetUserProfile,
 updateAnalyseById,
 addAnalyse,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnalyseModal);
