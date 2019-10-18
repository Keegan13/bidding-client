import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import PhoneIcon from '@material-ui/icons/Phone';
import BiddingCard from 'components/BiddingCard';
import BiddingTable from 'components/BiddingTable';
import { AssignmentPropType, CutterPropType } from 'models';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { FailedActionPropType } from '../../models/AppPropTypes';

function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
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
  }
}));


const BiddingDashboard = ({
  assignments, selectAssignment, deselectAssignment, removeAssignment, cutters, failed
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    selectAssignment(id);
  };

  const handleClose = () => {
    setOpen(false);
    deselectAssignment();
  };

  if (!assignments) {
    return <h2>No assignments yet!</h2>;
  }

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
                <div style={{ position: 'relative' }} key={item.id}>
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
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <IconButton className={classes.closeButton} aria-label="close" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <BiddingTable onClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
};


BiddingDashboard.propTypes = {
  assignments: PropTypes.arrayOf(AssignmentPropType).isRequired,
  selectAssignment: PropTypes.func.isRequired,
  deselectAssignment: PropTypes.func.isRequired,
  removeAssignment: PropTypes.func.isRequired,
  cutters: PropTypes.arrayOf(CutterPropType).isRequired,
  failed: PropTypes.arrayOf(FailedActionPropType)
};

export default BiddingDashboard;
