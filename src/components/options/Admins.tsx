import { connect } from 'react-redux';

export const Admins = () => {
 return (
  <div className="admins">
   <h1 className="header">Admins</h1>
   <div className="content">content</div>
  </div>
 );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
