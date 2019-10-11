import { createSelector } from 'reselect';

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

        return assignments.find(x => x.id == selectedId);
    }
);

export {
    selectAssignments,
    makeSelectAssignments,
    makeSelectSelectedAssignment
};
