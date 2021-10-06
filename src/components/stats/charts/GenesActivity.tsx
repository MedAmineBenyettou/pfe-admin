import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../store';
import Spinner from '../../layout/Spinner';
import { Pie } from 'react-chartjs-2';
import { CHARTBORDERCOLORS, CHARTCOLORS } from '../../../general/Common';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import { shuffle } from '../../../global';

const GenesActivity = ({ analyses, userProfile, profile }: PropsFromRedux) => {
 const [chartData, setChartData] = useState({});
 //  const [GenesActivity, setGenesActivity] = useState<number[]>([]);
 //  const [jours, setJours] = useState<string[]>([]);
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
   a.type.genes.forEach((g) => {
    var t = g.nom;
    if (!tx.includes(t)) tx.push(t);
   });
  });
  tx.forEach((a) => {
   ty.push(
    filtered.filter(
     (an) => an.type.genes.filter((gn) => gn.nom.match(a)).length > 0
    ).length
   );
  });

  // setJours(tx);
  // setGenesActivity(ty);

  setChartData({
   labels: tx,
   datasets: [
    {
     label: 'Gênes',
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
  <div className="GenesActivity row">
   {!analyses.loading ? (
    <>
     <h5>Gênes apparus dans le laboratoire:</h5>
     <FormControl className="col s4">
      <InputLabel id="input_temps_GenesActivity">Période :</InputLabel>
      <Select
       name="temps"
       value={temps}
       onChange={onChange}
       labelId="input_temps_GenesActivity"
      >
       <MenuItem value={-1}>Tous les temps</MenuItem>
       <MenuItem value={0}>Derniers 7 jours</MenuItem>
       <MenuItem value={1}>Derniers 30 jours</MenuItem>
      </Select>
     </FormControl>
     <div className="col s10 offset-s1">
      <Pie
       data={chartData}
       height={75}
       options={{
        responsive: true,
        title: {
         text: `Gênes apparus dans le laboratoire dans ${
          temps === -1
           ? 'tous les temps'
           : temps === 0
           ? 'derniers 7 jours'
           : 'derniers 30 jours'
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
 userProfile: state.userProfile,
 profile: state.profile,
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(GenesActivity);