import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import PhoneIcon from '@material-ui/icons/Phone';
import BiddingCard from 'components/BiddingCard';
import { AssignmentPropType, CutterPropType } from 'models';
import { FailedActionPropType } from 'models/AppPropTypes';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({

  wrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '400px'
  },
  cutter: {
    margin: '20px',
    position: 'relative',
    alignItems: 'center'
  },
  callButton: {
    position: 'absolute',
    display: 'inline',
    right: '-10px'
  },
  removeButton: {
    position: 'absolute',
    top: '137px',
    right: '26px',
    zIndex: '2',
    borderRadius: '14px',
    padding: '6px'
  },
  closeButton: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    zIndex: 10
  },
  cardWrapper: {
    position: 'relative'
  },
  paper: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const BiddingDashboard = ({
  assignments,
  selectAssignment,
  removeAssignment,
  cutters,
  failed
}) => {
  const classes = useStyles();

  const handleOpen = (id) => {
    selectAssignment(id);
  };

  if (!assignments) {
    return <h2>No assignments yet!</h2>;
  }

  console.log('rendergin dashboard');
  return (
    <div className={classes.wrapper}>
      {
        cutters.map((cutter) => (
          <div className={classes.column} id={`cutter-${cutter.id}`} key={cutter.id}>
            <div className={classes.cutter}>
              <h2 style={{ display: 'inline-block' }}>
                Cutter {cutter.id}
              </h2>
              <IconButton aria-label="call" className={classes.callButton}>
                <PhoneIcon fontSize="large" />
              </IconButton>
            </div>
            {
              assignments.filter((x) => x.cutterId == cutter.id).map((item) => (
                <div className={classes.cardWrapper} key={item.id}>
                  <IconButton aria-label="delete" onClick={() => removeAssignment(item.id)} className={classes.removeButton}>
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                  <BiddingCard
                    withWarning={failed.some((f) => f.parameters.assignmentId === item.id)}
                    key={item.id}
                    assignment={item}
                    onClick={() => handleOpen(item.id)}
                  />
                </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

BiddingDashboard.propTypes = {
  assignments: PropTypes.arrayOf(AssignmentPropType).isRequired,
  selectAssignment: PropTypes.func.isRequired,
  removeAssignment: PropTypes.func.isRequired,
  cutters: PropTypes.arrayOf(CutterPropType).isRequired,
  failed: PropTypes.arrayOf(FailedActionPropType)
};

function propsAreEqual(prev, next) {

  if (prev === next) return true;

  if (next.assignments === prev.assignments && next.cutters === prev.cutters && next.failed === prev.failed)
    return true;

  return false;
}

export default React.memo(BiddingDashboard, propsAreEqual);
