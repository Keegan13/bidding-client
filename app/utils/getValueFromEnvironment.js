import * as _ from 'lodash';

function getValueFromEnvironment(accessor) {
  if (_.isNil(accessor)) {
    throw new Error('property accessor is required');
  }

  let data = accessor.call(null, window);

  if (_.isNil(data)) {
    return null;
  }

  if (typeof (data) === 'string') {
    data = JSON.parse(data);
  }

  return data;
}

export default getValueFromEnvironment;
