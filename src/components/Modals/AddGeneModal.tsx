import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addGene, updateGeneById } from '../../actions/analyses';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';
import M from 'materialize-css';

const AddGeneModal = ({
 analyses: {
  selection: { gene },
  loading,
 },
 addGene,
 updateGeneById,
}: PropsFromRedux) => {
 const [form, setForm] = useState({
  nom: gene ? gene.nom : '',
  description: gene ? (gene.description ? gene.description : '') : '',
 });

 useEffect(() => {
  if (gene && !loading)
   setForm({
    nom: gene.nom,
    description: gene.description ? gene.description : '',
   });
  else
   setForm({
    nom: '',
    description: '',
   });
 }, [gene, loading]);

 const { nom, description } = form;

 const onChange = (e: any) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleClick = () => {
  if (gene) updateGeneById(gene._id, form);
  else addGene(form);
 };

 const close = () => {
  var elmnt = document.getElementById('AdminModal');
  if (elmnt) {
   var inst = M.Modal.getInstance(elmnt);
   inst.close();
  }
 };

 return (
  <div id="GeneModal" className="modal modal-fixed-footer">
   {loading ? (
    <Spinner />
   ) : (
    <>
     <div className="modal-content">
      <h4>
       {gene ? 'Modifier' : 'Ajouter'} un gêne {gene ? `(${gene.nom})` : ''}
      </h4>
      <div className="form row">
       <div className="input-field col s12">
        <input
         name="nom"
         id="nom"
         type="text"
         defaultValue={nom}
         onChange={onChange}
        />
        <label htmlFor="nom">Nom*</label>
       </div>
       <div className="input-field col s12">
        <input
         name="description"
         id="description"
         type="text"
         defaultValue={description}
         onChange={onChange}
        />
        <label htmlFor="description">Description</label>
       </div>
      </div>
     </div>
     <div className="modal-footer">
      <p className="red-text left">* sont nécéssaires</p>
      <button
       className="modal-close waves-effect waves-green btn-flat"
       onClick={handleClick}
      >
       {gene ? 'Modifier' : 'Ajouter'}
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

const mapDispatchToProps = { addGene, updateGeneById };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddGeneModal);
