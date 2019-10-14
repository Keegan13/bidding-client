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


// function TextMaskCustom(props) {
//     const { inputRef, ...other } = props;

//     return (
//         <MaskedInput
//             {...other}
//             ref={ref => {
//                 inputRef(ref ? ref.inputElement : null);
//             }}
//             mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
//             placeholderChar={'\u2000'}
//             showMask
//         />
//     );
// }

// TextMaskCustom.propTypes = {
//     inputRef: PropTypes.func.isRequired,
// };

// function NumberFormatCustom(props) {
//     const { inputRef, onChange, ...other } = props;

//     return (
//         <NumberFormat
//             {...other}
//             getInputRef={inputRef}
//             onValueChange={values => {
//                 onChange({
//                     target: {
//                         value: values.value,
//                     },
//                 });
//             }}
//             thousandSeparator
//             isNumericString
//             prefix="$"
//         />
//     );
// }

// NumberFormatCustom.propTypes = {
//     inputRef: PropTypes.func.isRequired,
//     onChange: PropTypes.func.isRequired,
// };



const BetForm = (props) => {
    const classes = useStyles();


    const { placeBet, assignment } = props;

    const [getState, setState] = useState({
        volume: '', placed: '', win: ''
    });

    const getAmountLeft = (assignment) => {
        let placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
        let left = assignment.amount - placed;

        return left > 0 ? left : 0;
    };

    const handleChange = name => event => {
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

    const onPlaceAllClick = () => {
        setState({ volume: getAmountLeft(assignment) });
    };

    return (
        <div className="place-bet-form">
            <div className={classes.container}>
                <TextField
                    className={classes.formControl}
                    label="Volume"
                    value={getState.volume}
                    onChange={handleChange('volume')}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="Place everything left"
                                    onClick={onPlaceAllClick}
                                >
                                    <AddIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>



            <div className={classes.container}>
                <TextField
                    className={classes.formControl+" "+classes.formOdds}
                    label="Placed"
                    value={getState.placed}
                    onChange={handleChange('placed')}
                    type="number"
                /></div>
            <div className={classes.container}>
                <TextField
                    className={classes.formControl+" "+classes.formOdds}
                    label="Win"
                    value={getState.win}
                    onChange={handleChange('win')}
                    type="number"
                />
            </div>
            <Button
                onClick={onPlaceBetSubmit}
                className={classes.submitButton}
                color="primary"
                variant="contained"
            >
                Add
      </Button>
        </div>
    )
};


export default BetForm;