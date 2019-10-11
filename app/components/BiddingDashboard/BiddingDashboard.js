import React, { useState } from 'react';
import BiddingTable from 'components/BiddingTable';
import BiddingCard from 'components/BiddingCard';
import * as _ from 'underscore';
import './styles.scss';
import { selectAssignment } from 'actions/bidding';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import BiddingSummary from '../BiddingSummary/BIddingSummary';

const groupByCutter = (assignments) => {
  var grouping = [];
  const groupObject = _.groupBy(assignments, x => x.cutterId);
  Object.keys(groupObject).forEach(function (prop) {
    grouping.push({
      key: prop,
      items: groupObject[prop]
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
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function BiddingDashboard(props) {
  const classes = useStyles();
  const { assignments, assignment, selectAssignment, deselectAssignment } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    selectAssignment(id);
  };

  const handleClose = () => {
    deselectAssignment();
    setOpen(false);
  };


  if (!assignments) {
    return <h2>No assignments yet!</h2>;
  }

  return (
    <div className="bidding-dashboard">
      {
        groupByCutter(assignments).map(x =>
          <div class="dashboard-column" id={`cutter-${x.key}`}>
            <h2 className="cutter-name">Cutter {x.key}</h2>
            {x.items.map((item, idx) => <BiddingCard item={item} key={idx} onClick={() => handleOpen(item.id)} />)}
          </div>
        )
      }
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <BiddingTable />
        </div>
      </Modal>
    </div>)
}