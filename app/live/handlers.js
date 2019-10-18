import { HUB_NEW_ASSIGNMENT_RECEIVED, HUB_CONNECTION_ESTABLISHED, HUB_CONNECTION_PENDING } from './actions';

export const HubHandlers = {
  [HUB_NEW_ASSIGNMENT_RECEIVED]: (state, action) => {
    const receivedAssignment = action.payload;

    if (!receivedAssignment) {
      return state;
    }

    const { assignments } = state;

    if (assignments.some((x) => x.id === receivedAssignment.id)) {
      const index = assignments.findIndex((x) => x.id === receivedAssignment.id);

      return {
        ...state,
        assignments: [...assignments.slice(0, index > 0 ? index : 0), receivedAssignment, ...assignments.slice(index + 1)],
      };
    }

    receivedAssignment.receivedDate = (new Date(Date.now())).toString();

    return { ...state, assignments: [...assignments, receivedAssignment] };
  },
  [HUB_CONNECTION_ESTABLISHED]: (state, action) => ({
    ...state,
    hubPending: false,
    hubConnected: true,
    connectionId: action.id
  }),
  [HUB_CONNECTION_PENDING]: (state) => ({ ...state, hubPending: true })
};

export default HubHandlers;
