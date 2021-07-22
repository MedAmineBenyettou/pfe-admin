import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { addAnalyseTypes, updateAnalyseTypeById } from '../../actions/analyses';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';
import M from 'materialize-css';
import { IAnalyseType } from '../../reducers/analyses';

const AnalyseTypeModal = ({
 analyses: {
  selection: { type },
  loading,
  genes,
 },
 updateAnalyseTypeById,
 addAnalyseTypes,
}: PropsFromRedux) => {
 const [form, setForm] = useState<
  Pick<IAnalyseType, 'nom' | 'description' | 'genes'>
 >({
  nom: type ? type.nom : '',
  description: type ? (type.description ? type.description : '') : '',
  genes: type ? type.genes : [],
 });

 useEffect(() => {
  if (type && !loading)
   setForm({
    nom: type.nom,
    description: type.description ? type.description : '',
    genes: type.genes,
   });
  else
   setForm({
    nom: '',
    description: '',
    genes: [],
   });
 }, [type, loading]);

 useEffect(() => {
  var elem = document.getElementById('analyseTypeModal-select');
  if (elem) {
   M.FormSelect.init(elem);
  }
 }, [type, loading]);

 const { nom, description, genes: mygenes } = form;

 const onChange = (e: any) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const handleClick = () => {
  form.genes = getMyGenes();
  if (type) updateAnalyseTypeById(type._id, form);
  else addAnalyseTypes(form);
 };

 const close = () => {
  var elmnt = document.getElementById('AdminModal');
  if (elmnt) {
   var inst = M.Modal.getInstance(elmnt);
   inst.close();
  }
 };

 const displayAllGenes = () => {
  var res = genes.map((g) => (
   <option key={g._id} value={JSON.stringify(g)}>
    {g.nom}
   </option>
  ));
  mygenes.forEach((g) => {
   res.forEach((e) => {
    // console.log(e, e.props);
    if (JSON.parse(e.props.value)._id === g._id)
     e = (
      <option selected={true} key={g._id} value={JSON.stringify(g)}>
       {g.nom}
      </option>
     );
   });
  });
  return res;
 };

 const getMyGenes = () => {
  var elem = document.getElementById('analyseTypeModal-select');
  if (elem) {
   var i = M.FormSelect.getInstance(elem);
   return i.getSelectedValues().map((v) => JSON.parse(v)._id);
  }
  return [];
 };

 return (
  <div id="AnalyseTypeModal" className="modal modal-fixed-footer">
   {loading ? (
    <Spinner />
   ) : (
    <>
     <div className="modal-content">
      <h4>
       {type ? 'Modifier' : 'Ajouter'} un type d'analyse{' '}
       {type ? `(${type.nom})` : ''}
      </h4>
      <div className="form row">
       <div className="input-field col s12">
        <input
         name="nom"
         id="analyseTypeModal-nom"
         type="text"
         defaultValue={nom}
         onChange={onChange}
        />
        <label htmlFor="analyseTypeModal-nom" className="active">
         Nom*
        </label>
       </div>
       <div className="input-field col s12">
        <input
         name="description"
         id="analyseTypeModal-description"
         type="text"
         defaultValue={description}
         onChange={onChange}
        />
        <label htmlFor="analyseTypeModal-description" className="active">
         Description
        </label>
       </div>
       <div className="input-field col s12">
        <select multiple={true} name="mygenes" id="analyseTypeModal-select">
         {displayAllGenes()}
        </select>
        <label>Selectioner les gênes</label>
       </div>
      </div>
     </div>
     <div className="modal-footer">
      <p className="red-text left">* sont nécéssaires</p>
      <button
       className="modal-close waves-effect waves-green btn-flat"
       onClick={handleClick}
      >
       {type ? 'Modifier' : 'Ajouter'}
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

const mapDispatchToProps = { addAnalyseTypes, updateAnalyseTypeById };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnalyseTypeModal);
