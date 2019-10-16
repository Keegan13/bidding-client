import React, { useEffect } from 'react';
import { ASSIGNMENT_STATUSES } from 'models';
import * as _ from 'lodash';
const canToPlaced = (assignment) => {
    if (assignment.status === ASSIGNMENT_STATUSES.PLACED) {
        return false;
    }

    if (assignment.placedBets.reduce((agg, next) => agg += next.volume, 0) >= assignment.amount) {
        return true;
    }

    return false;
}


const canToPending = (assignment) => {
    if (assignment.status === ASSIGNMENT_STATUSES.PENDING)
        return false

    return true;
}

const canToError = (assignment) => {
    if (assignment.status === ASSIGNMENT_STATUSES.ERROR)
        return false;
    return true;
}

const canToBePlaced = (assignment) => {
    if (assignment.status === ASSIGNMENT_STATUSES.TO_BE_PLACED)
        return false;

    if (assignment.placedBets.some(x => x.volume > 0))
        return false;

    return true;
}

const StatusSwitch = (props) => {
    const { assignment, onStatusChange } = props;

    useEffect(() => {
        console.log('effect switch');
    }, [assignment])


    const setStatus = (status) => {
        if (!_.isNil(onStatusChange)) {
            onStatusChange({
                assignmentId: assignment.id,
                status
            });
        }
    }

    return (
        <div>
            <button disabled={!canToBePlaced(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.TO_BE_PLACED)} >To be placed</button>
            <button disabled={!canToPending(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.PENDING)} >Pending</button>
            <button disabled={!canToPlaced(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.PLACED)}>Placed</button>
            <button disabled={!canToError(assignment)} onClick={() => setStatus(ASSIGNMENT_STATUSES.ERROR)}>Error</button>
        </div>
    )
};


export default StatusSwitch;