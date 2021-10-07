import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../store';
import Spinner from '../../layout/Spinner';
import { Bar } from 'react-chartjs-2';
import { CHARTBORDERCOLORS, CHARTCOLORS } from '../../../general/Common';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import { shuffle } from '../../../global';
import { getLangMessage } from '../../../actions/lang';

const AdminsActivity = ({ analyses, getLangMessage }: PropsFromRedux) => {
 const [chartData, setChartData] = useState({});
 const [temps, setTemps] = useState(-1);

 useEffect(() => {
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
  Chart();
 }, [temps, analyses.analyses.data, getLangMessage]);

 const onChange = (e: any) => {
  setTemps(e.target.value);
 };

 return (
  <div className="adminsActivity row">
   {!analyses.loading ? (
    <>
     <h4>{getLangMessage(71)}:</h4>
     <FormControl className="col s4">
      <InputLabel id="input_temps_AnalyseTypesActivity">
       {getLangMessage(80)} :
      </InputLabel>
      <Select
       name="temps"
       value={temps}
       onChange={onChange}
       labelId="input_temps_adminsActivity"
      >
       <MenuItem value={-1}>{getLangMessage(72)}</MenuItem>
       <MenuItem value={0}>{getLangMessage(73)}</MenuItem>
       <MenuItem value={1}>{getLangMessage(74)}</MenuItem>
      </Select>
     </FormControl>
     <div className="col s10 offset-s1">
      <Bar
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

export default connector(AdminsActivity);
