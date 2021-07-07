import { connect } from 'react-redux';

export const Profil = () => {
 return (
  <div className="profil">
   <h1 className="header">Profil</h1>
   <div className="content">content</div>
  </div>
 );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profil);
