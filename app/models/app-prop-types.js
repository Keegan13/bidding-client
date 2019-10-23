import PropTypes from 'prop-types';
import { NOTIFICATION_TYPES, ASSIGNMENT_STATUSES } from './constants';
import * as _ from 'lodash';


/**
 * Notification model validation
 */
export const NotificationPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf([..._.values(NOTIFICATION_TYPES)]),
  message: PropTypes.string.isRequired,
  level: PropTypes.number
});


/**
 * Assignment's bet model validation
 */
export const BetPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  assignmentId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

});

/**
 * Cutter model validation
 */
export const CutterPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired
});

/**
 * Bookmaker model validation
 */
export const BookmakerPropType = PropTypes.shape({
  bookmakerId: PropTypes.number.isRequired,
  bookmakerName: PropTypes.string.isRequired,
  cutters: PropTypes.arrayOf(CutterPropType)
});

/**
 * Assignment model validation
 */
export const AssignmentPropType = PropTypes.shape({
  id: PropTypes.number,
  raceId: PropTypes.number,
  raceName: PropTypes.string,
  trackName: PropTypes.string,
  bookmakerId: PropTypes.number,
  bookmakerName: PropTypes.string,
  horseId: PropTypes.number,
  horseName: PropTypes.string,
  amount: PropTypes.number,
  numerator: PropTypes.number,
  denominator: PropTypes.number,
  timeOutInSeconds: PropTypes.number,
  raceStartDateTime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  notes: PropTypes.string,
  timestampUtc: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  recommendationStatusType: PropTypes.oneOf([..._.values(ASSIGNMENT_STATUSES)]),
  //to be removed
  cutterId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placedBets: PropTypes.arrayOf(BetPropType)
});

/**
 * Failed action model validation
 */
export const FailedActionPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  actionType: PropTypes.string,
  parameters: PropTypes.object,
  message: PropTypes.string.isRequired,
  parameters: PropTypes.object,
  retryFunctionName: PropTypes.string,
  retry: PropTypes.func
});