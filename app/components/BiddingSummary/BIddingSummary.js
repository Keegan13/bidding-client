import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';
import Countdown from 'react-countdown-now';



const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    pending: {
        backgroundColor: 'orange',
        marginLeft: "50px"
    },
    placed: {
        backgroundColor: 'green',
        marginLeft: "50px"
    },
    toBePlaced: {
        backgroundColor: 'white',
        marginLeft: "50px"
    }
}));

function selectStats(assignments) {
    return assignments.reduce((agg, next) => {
        let placed = next.placedBets.reduce((a, n) => a += n.volume, 0);
        if (placed == 0) {
            agg.toBePlaced += next.amount;
        }
        else {
            agg.placed += placed;
            agg.pending += next.amount - placed > 0 ? next.amount - placed : 0;
        }

        return agg;

    }, {
        placed: 0,
        toBePlaced: 0,
        pending: 0
    });
}


const BiddingSummary = (props) => {
    const { assignments } = props;

    if (!assignments) {
        return (<Typography variant="h1" component="p">
            No items
        </Typography>)
    }

    const classes = useStyles();
    const stats = selectStats(assignments);


    return (<div style={{ display: 'flex', flexDirection: 'row', padding: '10px', alignItems: 'stretch' }}>
        <Card className={classes.toBePlaced}>
            <Typography variant="h4" component="p" style={{ padding: '20px' }}>
                To Be Placed: ${stats.toBePlaced}
            </Typography>
        </Card>
        <Card className={classes.pending}>
            <Typography variant="h4" component="p" style={{ padding: '20px' }}>
                Pending: ${stats.pending}
            </Typography>
        </Card>
        <Card className={classes.placed}>
            <Typography variant="h4" style={{ padding: '20px' }} component="p">
                Placed: ${stats.placed}
            </Typography>
        </Card>
    </div>);
};

export default BiddingSummary;