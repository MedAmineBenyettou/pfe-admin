import React from 'react';
import { connect, MapStateToPropsParam } from 'react-redux';
import { AppState } from '../../store';

type Props = Pick<AppState, 'auth' | 'profile'>;

export const Navbar: React.FC<Props> = ({ auth, profile }) => {
 return <div className="myNavbar">Navbar</div>;
};

const mapStateToProps: MapStateToPropsParam<Props, {}, AppState> = (
 state: AppState
) => ({
 auth: state.auth,
 profile: state.profile,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
