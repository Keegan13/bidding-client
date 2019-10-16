import React, { useState } from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-text-mask';
import { Form, Control } from 'react-redux-form';
import { useForm, useField, splitFormProps } from "react-form";
import moment from 'moment';
import './styles.scss';

function parseOdds(p, q) {
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
        p: Math.round(_p * 10) / 10,
        q: Math.round(_q * 10) / 10
    }
}

const useStyles = makeStyles(theme => ({
    submitButton: {
        margin: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
    },
    formOdds: {
        width: '80px',
        marginRight: '20px'
    }
}));




const getAmountLeft = (assignment) => {
    let placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
    let left = assignment.amount - placed;

    return left > 0 ? left : 0;
};

const BetForm = (props) => {
    const classes = useStyles();
    const { placeBet, assignment } = props;
    const [getState, setState] = useState({
        volume: '',
        placed: 1,
        win: 1
    });

    // const required = {
    //     isValid: (value) => !_.isNil(value),
    //     errorMessage: "Field is required"
    // };

    // const volumeValidator = {
    //     isValid: ({ volume }) => {
    //         if (volume < 0) {
    //             return false;
    //         }
    //         let left = assignment.amount - assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
    //         return left >= volume;
    //     },
    //     errorMessage: "Volume is not valid!!"
    // };


    // const validateOdds = {
    //     isValid: ({ placed, win }) => {
    //         return true;
    //     },
    //     errorMessage: "Volume is not valid!!"
    // }

    // const validators = {
    //     '': { validateOdds },
    //     volume: { volumeValidator },
    //     placed: {},
    //     win: {}
    // };

    const handleChange = name => event => {
        const { value } = event.target;

        if (value === '' || value > 0) {
            setState((state) => ({ ...state, [name]: value }));
        }

    };

    const onPlaceBetSubmit = () => {
        if (_.isNil(getState.volume) || getState.placed <= 0 || getState.win <= 0 || getAmountLeft(assignment) < getState.volume) {
            setState({ volume: '', placed: 1, win: 1 });
            return;
        }

        let odds = parseOdds(getState.placed, getState.win);
        placeBet(assignment.id, getState.volume, `${odds.p} : ${odds.q}`);
    };

    const handleSubmitFailed = (form) => {

        throw new Error("Function not implemented!");
    };


    const isTimeOut = (assignment) => {
        let endTicks = moment(assignment.startDateTime).valueOf() + assignment.timeSpan;
        let nowTicks = Date.now();
        return nowTicks >= endTicks ? true : false;
    };

    const onPlaceAllClick = () => {
        setState({ volume: getAmountLeft(assignment) });
    };

    //const required = str => !_.isNil(str);

    const disabled = getAmountLeft(assignment) <= 0 || isTimeOut(assignment) ? true : false;

    return (
        <div className="place-bet-form">
            <div className='form-control'>
                <label >Volume</label>
                <input name="volume" value={getState.volume} onChange={handleChange('volume')} disabled={disabled} />
            </div>
            <div>
                <label >Odds</label>
                <input className="odds-input" name="placed" value={getState.placed} onChange={handleChange('placed')} disabled={disabled} />

                <span>-</span>
                <input className="odds-input" name="win" value={getState.win} onChange={handleChange('win')} disabled={disabled} />
            </div>
            <button type="button" onClick={onPlaceBetSubmit} disabled={disabled}>Add</button>
        </div>
    )
};


export default BetForm;