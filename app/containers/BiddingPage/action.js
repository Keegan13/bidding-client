import { SELECT_ASSIGNMENT } from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */

export function selectAssignment(id) {
  return {
    type: SELECT_ASSIGNMENT
  };

}
