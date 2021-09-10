import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';
import AdminsActivity from './charts/AdminsActivity';

import '../../css/stats/stats.css';

export const Stats = () => {
 return (
  <div className="stats row">
   <div className="header col s12 center">
    <p className="header-desc col s8 offset-s2">
     Sur cette page, vous pouvez analyser les statistiques concernant les
     patients, les administrateurs et les analyses.
    </p>
   </div>
   <div className="content col s12 row">
    <AdminsActivity />
   </div>
  </div>
 );
};
