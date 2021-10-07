import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../store';
import Spinner from '../../layout/Spinner';
import { Pie } from 'react-chartjs-2';
import { CHARTBORDERCOLORS, CHARTCOLORS } from '../../../general/Common';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import { shuffle } from '../../../global';
import { getLangMessage } from '../../../actions/lang';

const AnalyseTypesActivity = ({ analyses, getLangMessage }: PropsFromRedux) => {
 const [chartData, setChartData] = useState({});
 //  const [AnalyseTypesActivity, setAnalyseTypesActivity] = useState<number[]>([]);
 //  const [jours, setJours] = useState<string[]>([]);
 const [temps, setTemps] = useState(-1);

 const Chart = () => {
  var filtered =
   temps === -1
    ? analyses.analyses.data
    : analyses.analyses.data.filter((a) =>
       moment(a.date).isAfter(moment().subtract(temps === 0 ? 7 : 30, 'days'))
      );
  //    console.log(filtered);
  var tx: string[] = [];
  var ty: number[] = [];

  filtered.forEach((a) => {
   var t = a.type.nom;
   if (!tx.includes(t)) tx.push(t);
  });
  //    console.log(tx);
  tx.forEach((a) => {
   ty.push(filtered.filter((an) => an.type.nom.match(a)).length);
  });

  setChartData({
   labels: tx,
   datasets: [
    {
     label: getLangMessage(78),
     data: ty,
     backgroundColor: shuffle(CHARTCOLORS),
     borderColor: shuffle(CHARTBORDERCOLORS),
     borderWidth: 1,
    },
   ],
  });
 };

 useEffect(() => {
  Chart();
 }, [temps]);

 const onChange = (e: any) => {
  setTemps(e.target.value);
 };

 return (
  <div className="AnalyseTypesActivity row">
   {!analyses.loading ? (
    <>
     <h5>{getLangMessage(79)}:</h5>
     <FormControl className="col s4">
      <InputLabel id="input_temps_AnalyseTypesActivity">
       {getLangMessage(80)} :
      </InputLabel>
      <Select
       name="temps"
       value={temps}
       onChange={onChange}
       labelId="input_temps_AnalyseTypesActivity"
      >
       <MenuItem value={-1}>{getLangMessage(72)}</MenuItem>
       <MenuItem value={0}>{getLangMessage(73)}</MenuItem>
       <MenuItem value={1}>{getLangMessage(74)}</MenuItem>
      </Select>
     </FormControl>
     <div className="col s10 offset-s1">
      <Pie
       data={chartData}
       height={75}
       options={{
        responsive: true,
        title: {
         text: `${getLangMessage(75)} ${
          temps === -1
           ? getLangMessage(72)
           : temps === 0
           ? getLangMessage(73)
           : getLangMessage(74)
         }`,
         display: true,
        },
       }}
      />
     </div>
    </>
   ) : (
    <Spinner />
   )}
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 analyses: state.analyses,
});

const mapDispatchToProps = { getLangMessage };

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnalyseTypesActivity);
