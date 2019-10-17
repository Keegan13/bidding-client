import React, { useState } from 'react';
import BiddingTable from 'components/BiddingTable';
import BiddingCard from 'components/BiddingCard';
import * as _ from 'lodash';
import './styles.scss';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import BiddingSummary from '../BiddingSummary/BiddingSummary';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const groupByCutter = (assignments) => {
  var grouping = [];
  const groupObject = _.groupBy(assignments, x => x.cutterId);
  Object.keys(groupObject).forEach(function (prop) {
    grouping.push({
      key: prop,
      items: _.orderBy(groupObject[prop], (item) => {
        return moment(item.receivedDate).valueOf();
      })
    })
  });

  return grouping;
};

function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 'auto',
    height: 'auto',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  removeButton: {
    position: 'absolute',
    top: '142px',
    right: '17px',
    zIndex: '2'
  }
}));


export default function BiddingDashboard(props) {
  const classes = useStyles();
  const { assignments, selectAssignment, deselectAssignment, removeAssignment, cutters } = props;
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
    <div className="bidding-dashboard">
      {
        cutters.map(cutter =>
          (<div className="dashboard-column" id={`cutter-${cutter.id}`} key={cutter.id}>
            <h2 className="cutter-name">Cutter {cutter.id}</h2>
            {
              assignments.filter(x => x.cutterId == cutter.id).map(item => (<div style={{ position: 'relative' }} key={item.id}>
                <IconButton aria-label="delete" onClick={() => removeAssignment(item.id)} className={classes.removeButton}>
                  <DeleteIcon fontSize="large" />
                </IconButton>
                <BiddingCard assignment={item} key={item.id} onClick={() => handleOpen(item.id)} />
              </div>))
            }
          </div>
          ))
      }
      <Modal
        open={open}
        onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <BiddingTable />
        </div>
      </Modal>
    </div >)
}