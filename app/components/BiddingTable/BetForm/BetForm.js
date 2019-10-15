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


const validateOdds = ({ placed, win }) => {

    return true;
};

const getAmountLeft = (assignment) => {
    let placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
    let left = assignment.amount - placed;

    return left > 0 ? left : 0;
};

const BetForm = (props) => {
    const classes = useStyles();
    const { placeBet, assignment } = props;
    const [getState, setState] = useState({
        volume: '', placed: '', win: ''
    });

    const required = {
        isValid: (value) => !_.isNil(value),
        errorMessage: "Field is required"
    };
    const volumeValidator = {
        isValid: ({ volume }) => {
            let left = assignment.amount - assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
            return left >= volume;
        },
        errorMessage: "Volume is not valid!!"
    };

    const validators = {
        '': { validateOdds },
        volume: { required, isVolumeValid: volumeValidator },
        placed: { required },
        win: { required }
    };


    const handleChange = name => event => {

        _.values(validators[name]).forEach(val=>)
        if (.reduce((agg, val) => {
            if (val.call(null, getState)) {
                agg.isValid = true;
            }
            else {
                agg.errors.push();
            }
        }),
            {
                isValid: true,
                errors: []
            })
            setState({ ...getState, [name]: event.target.value });
    };

    const onPlaceBetSubmit = () => {
        if (getAmountLeft(assignment) >= getState.volume) {
            let odds = parseOdds(getState.odds1, getState.odds2);
            placeBet(assignment.id, getState.volume, `${odds.p} : ${odds.q}`);
        }
        else {
            setState({ volume: '', placed: 1, win: 1 });
        }

    };

    const handleSubmitFailed = (form) => {

        throw new Error("Function not implemented!");
    };


    const onPlaceAllClick = () => {
        setState({ volume: getAmountLeft(assignment) });
    };

    const required = str => !_.isNil(str);



    return (
        <div className="place-bet-form">
            <label >Volume</label>
            <input name="volume" value={getState.volume} onChange={handleChange('volume')} />
            <label >Odds</label>
            <input name="placed" value={getState.placed} onChange={handleChange('placed')} />
            <span>-</span>
            <input name="win" value={getState.win} onChange={handleChange('win')} />
            <button type="button" onClick={onPlaceBetSubmit}>Add</button>
        </div>
    )
};


export default BetForm;