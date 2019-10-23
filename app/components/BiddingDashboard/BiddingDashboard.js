import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import PhoneIcon from '@material-ui/icons/Phone';
import BiddingCard from 'components/BiddingCard';
import { AssignmentPropType, CutterPropType, FailedActionPropType } from 'models';
import PropTypes from 'prop-types';
import React from 'react';
import { BookmakerPropType } from '../../models/app-prop-types';
import List from 'components/List';

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
    position: 'relative',
    cursor: 'pointer'
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
  bookmakers,
  failed
}) => {
  const classes = useStyles();

  const handleOpen = (id) => {
    selectAssignment(id);
  };

  if (!assignments) {
    return <h2>No assignments yet!</h2>;
  }

  return (
    <div className={classes.wrapper}>
      {
        bookmakers.map((bookmaker) => (
          <div className={classes.column} id={`bookmaker-${bookmaker.bookmakerId}`} key={bookmaker.bookmakerId}>
            <div className={classes.cutter}>
              <h2 style={{ display: 'inline-block' }}>
                {bookmaker.bookmakerName}
              </h2>
              <h4>Cutters: </h4>
              <List component={({ item }) => <li key={item.id} >{item.fullName}</li>} items={bookmaker.cutters}></List>
              <IconButton aria-label="call" className={classes.callButton}>
                <PhoneIcon fontSize="large" />
              </IconButton>
            </div>
            {
              assignments.filter((x) => x.bookmakerId == bookmaker.bookmakerId).map((item) => (
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
  bookmakers: PropTypes.arrayOf(BookmakerPropType).isRequired,
  failed: PropTypes.arrayOf(FailedActionPropType)
};

function propsAreEqual(prev, next) {

  if (prev === next) return true;

  if (next.assignments === prev.assignments && next.bookmakers === prev.bookmakers && next.failed === prev.failed)
    return true;

  return false;
}

export default React.memo(BiddingDashboard, propsAreEqual);
