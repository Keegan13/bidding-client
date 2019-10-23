import faker from 'faker';
import * as _ from 'lodash';

export function generateBets(count, assignmentId) {
  const data = [];

  for (let i = 0; i < count; i += 1) {
    data.push({
      id: faker.random.number(1000000),
      volume: faker.random.number({ min: 1, max: 30 }) * 1000,
      assignmentId,
      odds: `1.${faker.random.number(9)} : 1`,
      bookmaker: `${faker.name.firstName()} ${faker.name.lastName()}`
    });
  }

  return data;
}

export function generateAssignment(id, status) {
  if (_.isNil(id)) {
    id = faker.random.number(1000000);
  }

  const assignment = {
    id,
    number: 1,
    cutterId: faker.random.number({ min: 1, max: 3 }),
    location: faker.address.city(),
    raceStartDateTime: (new Date(Date.now())).toString(),
    amount: 0,
    timeOutInSeconds: faker.random.number({ min: 10, max: 220 }),
    placedBets: [...generateBets(faker.random.number({ min: 0, max: 4 }), id)]
  };

  if (status === 'new') {
    assignment.placedBets.length = 0;
  }

  assignment.amount = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0) + faker.random.number({ min: 1, max: 10 }) * 1000;

  return assignment;
}


export function generateAssignments(length) {
  const data = [];

  if (_.isNil(length)) {
    length = faker.random.number({ min: 1, max: 5 });
  }

  for (let i = 0; i < length; i += 1) {
    data.push(generateAssignment());
  }

  return data;
}
