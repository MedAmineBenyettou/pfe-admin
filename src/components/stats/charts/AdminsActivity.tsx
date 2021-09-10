import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from '../../../store';
import Spinner from '../../layout/Spinner';

const AdminsActivity = ({ analyses, userProfile, profile }: PropsFromRedux) => {
 useEffect(() => {}, []);

 return <div className="adminsActivity">Admins Activity</div>;
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
