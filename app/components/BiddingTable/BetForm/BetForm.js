import React from 'react';
import { Formik, Field } from 'formik';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { splitBidThunk } from './../../../api/thunks';

import { makeSelectLoading, makeSelectError } from './../../../containers/App/selectors';
import { makeSelectSelectedAssignment } from  'selectors/bidding';
import fasdf from 'actions';

class BetForm extends React.Component {
    constructor(props) {
        super(props);
        console.log(fasdf);
        this.onPlaceBetSubmit = this.onPlaceBetSubmit.bind(this);
    }

    parseOdds(p, q) {
        let _p = Number.parseInt(p);
        let _q = Number.parseInt(q);

        if (_p > _q) {
            _p /= _q;
            _q = 1;
        }
        else {
            _q /= _p;
            _p = 1;
        }

        return {
            p: Math.round(_p*10)/10,
            q: Math.round(_q*10)/10
        }
    }

    onPlaceBetSubmit(values) {
        const { splitBidAction, assignment } = this.props;
        let odds = this.parseOdds(values.leftodds, values.rightodds);

        var input = {
            assignmentId: assignment.id,
            volume: values.volume,
            odds: `${odds.p} : ${odds.q}`
        };

        splitBidAction(input);
    }

    render() {

        return (<Formik
            initialValues={{ volume: '', leftodds: '', rightodds: '' }}
            onSubmit={(values, actions) => {
                this.onPlaceBetSubmit(values);
            }}
            render={props => (
                <form onSubmit={props.handleSubmit}>
                    <Field type="text" name="volume" />

                    <input
                        type="number"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="leftodds"
                    />
                    <input
                        type="number"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.name}
                        name="rightodds"
                    />
                    {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                    <button type="submit">Submit</button>
                </form>
            )}
        />)
    }
}


const mapDispatchToProps = (dispatch) => bindActionCreators({
    splitBidAction: splitBidThunk,
}, dispatch)



const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    error: makeSelectError(),
    assignment: makeSelectSelectedAssignment()
});

export default compose(connect((mapStateToProps), mapDispatchToProps))(BetForm);
