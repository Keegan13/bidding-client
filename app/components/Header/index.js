import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import Header from './Header';
import { loadAssignmentsThunk } from 'api/thunks';


const mapDispatchToProps = (dispatch) => bindActionCreators({
    realoadAssignments: loadAssignmentsThunk,
}, dispatch)

const withConnect = connect((state) => { return {}; }, mapDispatchToProps);

export default compose(withConnect)(Header);
export { mapDispatchToProps };

