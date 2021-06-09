import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store';
import { AlertState } from '../../reducers/alerts';
import '../../css/Alert/Alert.css';

interface state {
 alerts: AlertState;
}

const Alert: React.FC<state> = ({ alerts }) => {
 return (
  <div className="alert-container">
   {alerts !== null &&
    alerts.length > 0 &&
    alerts.map((a) => (
     <div key={a.id} className={`alert alert-${a.alertType}`}>
      {a.msg}
     </div>
    ))}
  </div>
 );
};

const mapStateToProps = (state: AppState) => ({
 alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
