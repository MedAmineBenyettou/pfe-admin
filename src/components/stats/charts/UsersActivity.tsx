import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../store';
import Spinner from '../../layout/Spinner';
import { Line } from 'react-chartjs-2';
import { CHARTBORDERCOLORS, CHARTCOLORS } from '../../../general/Common';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import { shuffle } from '../../../global';

const UsersActivity = ({ analyses, lang }: PropsFromRedux) => {
 const [chartData, setChartData] = useState({});
 //  const [UsersActivity, setUsersActivity] = useState<number[]>([]);
 //  const [jours, setJours] = useState<string[]>([]);
 const [temps, setTemps] = useState(-1);

 useEffect(() => {
  const Chart = () => {
   var filtered = analyses.analyses.data.filter((a) =>
    temps === -1
     ? true
     : moment(a.date).isAfter(moment().subtract(temps === 0 ? 7 : 30, 'days'))
   );

   var tx: string[] = [];
   var ty: number[] = [];

   filtered.forEach((a) => {
    var t = moment(a.date).format('DD MMM Y');
    if (!tx.includes(t)) tx.push(t);
   });
   tx.forEach((a) => {
    ty.push(
     new Set(
      filtered
       .filter((an) => moment(an.date).format('DD MMM Y').match(a))
       .map((an) => an.patient)
     ).size
    );
   });

   // setJours(tx);
   // setUsersActivity(ty);

   //@ts-ignore
   tx = tx.sort((a, b) => Date(a) - Date(b));

   setChartData({
    labels: tx,
    datasets: [
     {
      label: lang.messages.find((m) => m.code.match(String(11)))?.message,
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
  <div className="UsersActivity row">
   {!analyses.loading ? (
    <>
     <h4>{lang.messages.find((m) => m.code.match(String(82)))?.message}:</h4>
     <FormControl className="col s4">
      <InputLabel id="input_temps_AnalyseTypesActivity">
       {lang.messages.find((m) => m.code.match(String(80)))?.message} :
      </InputLabel>
      <Select
       name="temps"
       value={temps}
       onChange={onChange}
       labelId="input_temps_UsersActivity"
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
      <Line
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
        scales: {
         y: {
          min: 0,
         },
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

export default connector(UsersActivity);
