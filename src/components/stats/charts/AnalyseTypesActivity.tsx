import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../store';
import Spinner from '../../layout/Spinner';
import { Pie } from 'react-chartjs-2';
import { CHARTBORDERCOLORS, CHARTCOLORS } from '../../../general/Common';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import { shuffle } from '../../../global';

const AnalyseTypesActivity = ({ analyses, lang }: PropsFromRedux) => {
 const [chartData, setChartData] = useState({});
 //  const [AnalyseTypesActivity, setAnalyseTypesActivity] = useState<number[]>([]);
 //  const [jours, setJours] = useState<string[]>([]);
 const [temps, setTemps] = useState(-1);

 useEffect(() => {
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
      label: lang.messages.find((m) => m.code.match(String(78)))?.message,
      data: ty,
      backgroundColor: shuffle(CHARTCOLORS),
      borderColor: shuffle(CHARTBORDERCOLORS),
      borderWidth: 1,
     },
    ],
   });
  };

  Chart();
 }, [temps, analyses.analyses.data, lang]);

 const onChange = (e: any) => {
  setTemps(e.target.value);
 };

 return (
  <div className="AnalyseTypesActivity row">
   {!analyses.loading ? (
    <>
     <h5>{lang.messages.find((m) => m.code.match(String(79)))?.message}:</h5>
     <FormControl className="col s4">
      <InputLabel id="input_temps_AnalyseTypesActivity">
       {lang.messages.find((m) => m.code.match(String(80)))?.message} :
      </InputLabel>
      <Select
       name="temps"
       value={temps}
       onChange={onChange}
       labelId="input_temps_AnalyseTypesActivity"
      >
       <MenuItem value={-1}>
        {lang.messages.find((m) => m.code.match(String(72)))?.message}
       </MenuItem>
       <MenuItem value={0}>
        {lang.messages.find((m) => m.code.match(String(73)))?.message}
       </MenuItem>
       <MenuItem value={1}>
        {lang.messages.find((m) => m.code.match(String(74)))?.message}
       </MenuItem>
      </Select>
     </FormControl>
     <div className="col s10 offset-s1">
      <Pie
       data={chartData}
       height={75}
       options={{
        responsive: true,
        title: {
         text: `${
          lang.messages.find((m) => m.code.match(String(75)))?.message
         } ${
          temps === -1
           ? lang.messages.find((m) => m.code.match(String(72)))?.message
           : temps === 0
           ? lang.messages.find((m) => m.code.match(String(73)))?.message
           : lang.messages.find((m) => m.code.match(String(74)))?.message
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
 lang: state.lang.lang,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnalyseTypesActivity);
