import PropTypes from 'prop-types';
import { NOTIFICATION_TYPES } from 'constant';
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
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});

/**
 * Assignment model validation
 */
export const AssignmentPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  location: PropTypes.string,
  startDateTime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]).isRequired,
  cutterId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  amount: PropTypes.number.isRequired,
  timeSpan: PropTypes.number.isRequired,
  placedBets: PropTypes.arrayOf(BetPropType)
});
