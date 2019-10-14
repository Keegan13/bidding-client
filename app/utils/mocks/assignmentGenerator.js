import faker from 'faker';
import * as _ from 'lodash';

export function generateBets(count, assignmentId) {
    var data = [];

    for (var i = 0; i < count; i++) {
        data.push({
            id: faker.random.number(1000000),
            volume: faker.random.number({ min: 1, max: 30 }) * 1000,
            assignmentId,
            odds: `1.${faker.random.number(9)} : 1`,
            bookmaker: `${faker.name.firstName()} ${faker.name.lastName()}`
        })
    }

    return data
};

export function generateAssignment(id) {
    if (_.isNil(id)) {
        id = faker.random.number(1000000);
    }

    let assignment = {
        id,
        number: 1,
        cutterId: faker.random.number({ min: 1, max: 3 }),
        location: faker.address.city(),
        startDateTime: (new Date(Date.now())).toString(),
        amount: 0,
        timeSpan: faker.random.number({ min: 10, max: 220 }) * 1000,
        placedBets: [...generateBets(faker.random.number({ min: 0, max: 4 }), id)]
    }

    assignment.amount = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0) + faker.random.number({ min: 1, max: 10 }) * 1000;

    return assignment;
}


export function generateAssignments(length) {
    var data = [];

    if (_.isNil(length)) {
        length = faker.random.number({ min: 1, max: 5 });
    }

    for (var i = 0; i < length; i++) {
        data.push(generateAssignment());
    }

    return data;
}