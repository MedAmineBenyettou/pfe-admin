import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addGene } from '../../actions/analyses';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';

const AddGeneModal = ({
 analyses: {
  selection: { gene },
  loading,
 },
 addGene,
}: PropsFromRedux) => {
 const [form, setForm] = useState({
  nom: gene ? gene.nom : '',
  description: gene ? (gene.description ? gene.description : '') : '',
 });

 const { nom, description } = form;
 useEffect(() => {
  setForm({
   nom: gene ? gene.nom : nom,
   description: gene
    ? gene.description
      ? gene.description
      : description
    : description,
  });
 }, []);

 const onChange = (e: any) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleClick = () => {
  addGene(form);
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
      <a
       href="#"
       className="modal-close waves-effect waves-green btn-flat"
       onClick={handleClick}
      >
       {gene ? 'Sauvgarder' : 'Ajouter'}
      </a>
     </div>
    </>
   )}
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
});

const mapDispatchToProps = { addGene };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddGeneModal);
