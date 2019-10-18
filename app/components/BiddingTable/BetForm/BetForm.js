import React from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, useField } from 'react-form';

function parseOdds(p, q) {
  return {
    p: p > q ? Math.round(p / q * 10) / 10 : 1,
    q: q > p ? Math.round(q / p * 10) / 10 : 1
  };
}

const useStyles = makeStyles((theme) => ({
  submitButton: {
    margin: theme.spacing(1),
  },
  form: {
    display: 'flex',
    position: 'relative'
  },
  formGroup: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1),
  },
  formOdds: {
    width: '80px',
    marginRight: '20px'
  },
  messageInvalid: {
    display: 'block',
    color: '#ab2424',
    fontWeight: 500
  }
}));

const getAmountLeft = (assignment) => {
  const placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
  const left = assignment.amount - placed;
  return !_.isNaN(left) && left > 0 ? left : 0;
};


const BetForm = ({ placeBet, assignment, ...other }) => {
  const classes = useStyles();
  const { Form, formContext, meta: { canSubmit, error } } = useForm({
    onSubmit: ({ volume, placed, win }, instance) => {
      const odds = parseOdds(placed, win);
      placeBet(assignment.id, volume, `${odds.p} : ${odds.q}`);
      instance.setFieldMeta('volume', (meta) => {
        meta.isTouched = false;
        return meta;
      });
    }
  });
  const { getInputProps: volumeGetInputProps, meta: { error: errorVolume } } = useField('volume', {
    formContext,
    validate: (value) => {
      if (!value) {
        return 'Volume is required field!';
      }
      if (parseInt(value) <= 0) {
        return 'Volume should be greater than 0';
      }
      if (getAmountLeft(assignment) < value) {
        return 'Not enough money left';
      }

      return false;
    }
  });

  const { getInputProps: placedGetInputProps, meta: { error: errorPlaced } } = useField('placed', {
    formContext,
    validate: (value) => {
      if (!value) {
        return 'Left hand odds is required field!';
      }

      if (parseInt(value) < 1) {
        return 'Left hand odds should be greater or equal to 1';
      }

      return false;
    }
  });

  const { getInputProps: winGetInputProps, meta: { error: errorWin } } = useField('win', {
    formContext,
    validate: (value) => {
      if (!value) {
        return 'Right hand odds is required field';
      }

      if (parseInt(value) < 1) {
        return 'Right hand odds should be greater or equal to 1';
      }
      return false;
    }
  });

  return (
    <Form className={classes.form} {...other}>
      <div className={classes.formGroup}>
        <label>
                Volume:
        </label>
        <div className={classes.formControl}>
          <input {...volumeGetInputProps()} type="number" />
          <span className={classes.messageInvalid}>{errorVolume}</span>
        </div>
      </div>
      <div className={classes.formGroup}>
        <label>
                Odds:
        </label>
        <div className={classes.formGroup}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <input className={classes.formOdds} {...placedGetInputProps()} type="number" />
            <span>-</span>
            <input className={classes.formOdds} {...winGetInputProps()} type="number" />
          </div>
          <span className={classes.messageInvalid}>{errorWin}</span>
          <span className={classes.messageInvalid}>{errorPlaced}</span>
        </div>
      </div>
      <div className={classes.formGroup}>
        <button className={classes.submitButton} type="submit" disabled={!canSubmit}>Add</button>
      </div>
    </Form>
  );
};

BetForm;

BetForm.propTypes = {
  assignment: PropTypes.object.isRequired,
  placeBet: PropTypes.func.isRequired
};

export default BetForm;

// export default React.memo(BetForm, (prevProps, nextProps) => {
//     const { assignment: prev } = prevProps;
//     const { assignment: next } = nextProps;

//     let shouldUpdate = prev.id != next.id
//         || prev.placedBets.length != next.placedBets.length
//         || prev.status != next.status ? true : false;

//     return shouldUpdate;
// })
