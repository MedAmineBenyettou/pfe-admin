import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../store';
import Spinner from '../../layout/Spinner';
import { Line } from 'react-chartjs-2';
import { CHARTBORDERCOLORS, CHARTCOLORS } from '../../../general/Common';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import { shuffle } from '../../../global';

const AnalysesActivity = ({ analyses }: PropsFromRedux) => {
 const [chartData, setChartData] = useState({});

 const [temps, setTemps] = useState(-1);

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
    filtered.filter((an) => moment(an.date).format('DD MMM Y').match(a)).length
   );
  });

  setChartData({
   labels: tx,
   datasets: [
    {
     label: 'Analyses',
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
  <div className="AnalysesActivity row">
   {!analyses.loading ? (
    <>
     <h4>Analyses faites dans le laboratoire:</h4>
     <FormControl className="col s4">
      <InputLabel id="input_temps_AnalysesActivity">Période :</InputLabel>
      <Select
       name="temps"
       value={temps}
       onChange={onChange}
       labelId="input_temps_AnalysesActivity"
      >
       <MenuItem value={-1}>Tous les temps</MenuItem>
       <MenuItem value={0}>Derniers 7 jours</MenuItem>
       <MenuItem value={1}>Derniers 30 jours</MenuItem>
      </Select>
     </FormControl>
     <div className="col s10 offset-s1">
      <Line
       data={chartData}
       height={75}
       options={{
        responsive: true,
        title: {
         text: `Analyses faites dans le laboratoire dans ${
          temps === -1
           ? 'tous les temps'
           : temps === 0
           ? 'derniers 7 jours'
           : 'derniers 30 jours'
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
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AnalysesActivity);
