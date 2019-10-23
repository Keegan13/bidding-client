import apiHandlers from 'api/handlers';
import hubHandlers from 'live/handlers';
import createReducer from 'utils/createReducer';
import getStateFromWindow from 'utils/getValueFromEnvironment';
import { dateReceivedPipe } from 'api/helpers';
import {
  REMOVE_ASSIGNMENT,
  SELECT_ASSIGNMENT,
  DESELECT_ASSIGNMENT,
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  ADD_FAILED_ACTION,
  REMOVE_FAILED_ACTION
} from 'actions';

const cuttersFromWindow = getStateFromWindow((window) => window.cutters);
const assignmentsFromWindow = getStateFromWindow((window) => window.assignments);

const initialState = {
  assignments: [...dateReceivedPipe(assignmentsFromWindow)] || [],
  selectedId: null,
  pending: false,
  bet: {
    volume: '',
    placed: 1,
    win: 1
  },
  bookmakers: [],
  notifications: [],
  failedActions: [],
  cutters: [...(cuttersFromWindow || [])]
};

const biddingReducer = createReducer(initialState,
  {
    ...apiHandlers,
    ...hubHandlers,
    [SELECT_ASSIGNMENT]: (state, action) => ({
      ...state,
      selectedId: action.id
    }),
    [REMOVE_ASSIGNMENT]: (state, action) => ({
      ...state,
      assignments: [...state.assignments.filter((x) => x.id !== action.id)],
      selectedId: state.selectedId === action.id ? null : state.selectedId
    }),
    [DESELECT_ASSIGNMENT]: (state, action) => ({
      ...state,
      selectedId: action.id
    }),
    [ADD_NOTIFICATION]: (state, action) => ({ ...state, notifications: [...state.notifications, { ...action.payload, id: Date.now() }] }),
    [REMOVE_NOTIFICATION]: (state, action) => ({ ...state, notifications: [...state.notifications.filter((x) => x.id !== action.id)] }),
    [ADD_FAILED_ACTION]: (state, action) => {
      const { failedAction } = action;
      return { ...state, failedActions: [...state.failedActions, failedAction] };
    },
    [REMOVE_FAILED_ACTION]: (state, action) => {
      const { failedId } = action;
      return { ...state, failedActions: [...state.failedActions.filter((x) => x.id !== failedId)] };
    }
  });

export default biddingReducer;
