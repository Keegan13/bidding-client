import apiHandlers from 'api/handlers';
import hubHandlers from 'live/handlers';
import createReducer from 'utils/createReducer';
import getStateFromWindow from 'utils/getValueFromEnvironment';
import { dateReceivedPipe } from 'api/helpers';
import { REMOVE_ASSIGNMENT, SELECT_ASSIGNMENT, DESELECT_ASSIGNMENT, ADD_NOTIFICATION, REMOVE_NOTIFICATION } from 'actions';


let cuttersFromWindow = getStateFromWindow(window => window.cutters);
let assignmentsFromWindow = getStateFromWindow((window) => window.assignments);

const initialState = {
    assignments: [...dateReceivedPipe(assignmentsFromWindow)] || [],
    selectedId: null,
    pending: false,
    bet: {
        volume: '',
        placed: 1,
        win: 1
    },
    notifications: [],
    cutters: [...(cuttersFromWindow || [])]
};

const biddingReducer = createReducer(initialState,
    {
        ...apiHandlers,
        ...hubHandlers,
        [SELECT_ASSIGNMENT]: (state, action) => {
            return {
                ...state,
                selectedId: action.id
            }
        },
        [REMOVE_ASSIGNMENT]: (state, action) => {
            return {
                ...state,
                assignments: [...state.assignments.filter(x => x.id != action.id)],
                selectedId: state.selectedId == action.id ? null : state.selectedId
            }
        },
        [DESELECT_ASSIGNMENT]: (state, action) => {
            return {
                ...state,
                selectedId: action.id
            }
        },
        [ADD_NOTIFICATION]: (state, action) => {
            return { ...state, notifications: [...state.notifications, { ...action.payload, id: Date.now() }] }
        },
        [REMOVE_NOTIFICATION]: (state, action) => {
            return { ...state, notifications: [...state.notifications.filter(x => x.id != action.id)] }
        }
    });

export default biddingReducer;

