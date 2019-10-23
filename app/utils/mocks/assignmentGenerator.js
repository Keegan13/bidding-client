import faker from 'faker';
import * as _ from 'lodash';
import { ASSIGNMENT_STATUSES } from 'models/constants';

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

export function generateCutter() {
  return {
    id: faker.random.number(100000),
    fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    login: faker.internet.userName()
  };
}

export function generateBookmaker(id) {
  if (_.isNil(id)) {
    id = faker.random.number(3);
  }

  let cutters = [];
  const len = faker.random.number(3);

  for (let i = 0; i < len; i++) {
    cutters.push(generateCutter());
  }

  const bookmaker = {
    bookmakerId: id,
    bookmakerName: `${faker.name.firstName()} ${faker.name.lastName()}`,
    cutters: cutters
  };

  return bookmaker;
}

export function generateAssignment(id, status) {
  if (_.isNil(id)) {
    id = faker.random.number(1000000);
  }

  const assignment = {

    id,
    raceId: 3,
    raceName: faker.address.city(),
    trackName: "Track name",
    bookmakerId: faker.random.number(4),
    bookmakerName: faker.name.firstName(),
    horseId: faker.random.number(1000),
    horseName: faker.name.firstName(),
    amount: 0,
    numerator: 1,
    denominator: 1,
    timeOutInSeconds: faker.random.number({ min: 10, max: 220 }),

    raceStartDateTime: (new Date(Date.now())).toString(),
    notes: "",
    timestampUtc: "",
    recommendationStatusType: ASSIGNMENT_STATUSES.TO_BO_PLACED,
    number: 1,
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
