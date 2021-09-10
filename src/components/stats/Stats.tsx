import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../store';
import Spinner from '../layout/Spinner';
import AdminsActivity from './charts/AdminsActivity';

import '../../css/stats/stats.css';

export const Stats = () => {
 return (
  <div className="stats">
   <p className="header-desc">
    Ajouter, modifier ou supprimer les types de gênes traités et types
    d'analyses proposer par le laboratoire
   </p>
   <div className="content">
    <AdminsActivity />
   </div>
  </div>
 );
};
