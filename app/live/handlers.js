import { HUB_NEW_ASSIGNMENT_RECEIVED, HUB_CONNECTION_ESTABLISHED, HUB_CONNECTION_PENDING } from './actions';

export const HubHandlers = {
    [HUB_NEW_ASSIGNMENT_RECEIVED]: (state, action) => {
        let receivedAssignment = action.payload;

        if (!receivedAssignment) {
            return state;
        }

        const { assignments } = state;

        if (assignments.some(x => x.id == receivedAssignment.id)) {
            let index = assignments.findIndex(x => x.id == receivedAssignment.id);

            return {
                ...state,
                assignments: [...assignments.slice(0, index > 0 ? index : 0), receivedAssignment, ...assignments.slice(index + 1)],
            };
        }

        return { ...state, assignments: [...assignments, receivedAssignment] }
    },
    [HUB_CONNECTION_ESTABLISHED]: (state, action) => {
        return {
            ...state,
            hubPending: false,
            hubConnected: true
        };
    },
    [HUB_CONNECTION_PENDING]: (state, action) => {
        return { ...state, hubPending: true }
    }
}

export default HubHandlers;