import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../store';
import Spinner from '../../layout/Spinner';
import { Bar } from 'react-chartjs-2';
import { CHARTBORDERCOLORS, CHARTCOLORS } from '../../../general/Common';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import { shuffle } from '../../../global';

const AdminsActivity = ({ analyses, userProfile, profile }: PropsFromRedux) => {
 const [chartData, setChartData] = useState({});
 const [temps, setTemps] = useState(-1);

 const Chart = () => {
  var filtered = analyses.analyses.data.filter((a) =>
   temps === -1
    ? true
    : moment(a.date).isAfter(moment().subtract(temps === 0 ? 7 : 30, 'days'))
  );

  var tadmins: string[] = [];
  var tactivity: number[] = [];

  filtered.forEach((a) => {
   if (!tadmins.includes(a.user.user.username))
    tadmins.push(a.user.user.username);
  });
  tadmins.forEach((a) => {
   tactivity.push(
    filtered.filter((an) => an.user.user.username.match(a)).length
   );
  });

  //    setAdmins(tadmins);
  //    setAdminsActivity(tactivity);

  setChartData({
   labels: tadmins,
   datasets: [
    {
     label: '.data',
     data: tactivity,
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
  <div className="adminsActivity row">
   {!analyses.loading ? (
    <>
     <h4>Activité des administrateurs:</h4>
     <FormControl className="col s4">
      <InputLabel id="input_temps_adminsActivity">Période :</InputLabel>
      <Select
       name="temps"
       value={temps}
       onChange={onChange}
       labelId="input_temps_adminsActivity"
      >
       <MenuItem value={-1}>Tous les temps</MenuItem>
       <MenuItem value={0}>Derniers 7 jours</MenuItem>
       <MenuItem value={1}>Derniers 30 jours</MenuItem>
      </Select>
     </FormControl>
     <div className="col s10 offset-s1">
      <Bar
       data={chartData}
       height={75}
       options={{
        responsive: true,
        title: {
         text: `Analyses faites par les administrateurs dans ${
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

export default connector(AdminsActivity);
