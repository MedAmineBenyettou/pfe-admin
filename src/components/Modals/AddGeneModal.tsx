import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';

const AddGeneModal = ({
 analyses: {
  selection: { gene },
  loading,
 },
}: PropsFromRedux) => {
 const [form, setForm] = useState({
  nom: gene ? gene.nom : '',
  description: gene ? (gene.description ? gene.description : '') : '',
 });

 const { nom, description } = form;

 const onChange = (e: any) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };
 if (loading) return <Spinner />;
 return (
  <div id="modal1" className="modal modal-fixed-footer">
   <div className="modal-content">
    <h4>Ajouter/Modifier un gêne</h4>
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
    <a href="#!" className="modal-close waves-effect waves-green btn-flat">
     Sauvgarder
    </a>
   </div>
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AddGeneModal);
