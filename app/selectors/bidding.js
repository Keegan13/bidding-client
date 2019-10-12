import { createSelector } from 'reselect';
import { select } from '@redux-saga/core/effects';

const selectAssignments = (state) => state.assignments;

const makeSelectAssignments = () => createSelector(
    selectAssignments,
    (assignments) => assignments.assignments
);

const makeSelectSelectedAssignment = () => createSelector(
    selectAssignments,
    (assignmentsSection) => {
        let assignments = assignmentsSection.assignments;
        const { selectedId } = assignmentsSection;

        if (!assignments || !assignments.length > 0 || !selectedId) {
            return null;
        }        
        let item=assignments.find(x => x.id == selectedId);
        return item;
    }
);

export {
    selectAssignments,
    makeSelectAssignments,
    makeSelectSelectedAssignment
};
