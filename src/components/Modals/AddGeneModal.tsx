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
 lang,
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
       {gene
        ? lang.messages.find((m) => m.code.match(String(16)))?.message
        : lang.messages.find((m) => m.code.match(String(17)))?.message}{' '}
       {lang.messages.find((m) => m.code.match(String(21)))?.message}{' '}
       {gene ? `(${gene.nom})` : ''}
      </h4>
      <div className="form row">
       <div className="input-field col s12">
        <input
         name="nom"
         id="GeneModal-nom"
         type="text"
         defaultValue={nom}
         onChange={onChange}
        />
        <label htmlFor="GeneModal-nom" className="active">
         {lang.messages.find((m) => m.code.match(String(18)))?.message}*
        </label>
       </div>
       <div className="input-field col s12">
        <input
         name="description"
         id="GeneModal-description"
         type="text"
         defaultValue={description}
         onChange={onChange}
        />
        <label htmlFor="GeneModal-description" className="active">
         {lang.messages.find((m) => m.code.match(String(19)))?.message}
        </label>
       </div>
      </div>
     </div>
     <div className="modal-footer">
      <p className="red-text left">
       * {lang.messages.find((m) => m.code.match(String(20)))?.message}
      </p>
      <button
       className="modal-close waves-effect waves-green btn-flat"
       onClick={handleClick}
      >
       {gene
        ? lang.messages.find((m) => m.code.match(String(16)))?.message
        : lang.messages.find((m) => m.code.match(String(17)))?.message}
      </button>
      <button
       onClick={close}
       className="modal-close waves-effect btn-flat white black-text"
      >
       {lang.messages.find((m) => m.code.match(String(22)))?.message}
      </button>
     </div>
    </>
   )}
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
 lang: state.lang.lang,
});

const mapDispatchToProps = { addGene, updateGeneById };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddGeneModal);
