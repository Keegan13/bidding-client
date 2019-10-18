import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { loadAssignmentsThunk } from 'api/thunks';
import Header from './Header';


const mapDispatchToProps = (dispatch) => bindActionCreators({
  realoadAssignments: loadAssignmentsThunk,
}, dispatch);

const withConnect = connect((state) => ({}), mapDispatchToProps);

export default compose(withConnect)(Header);
export { mapDispatchToProps };
