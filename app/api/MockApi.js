import * as faker from 'faker';
import { generateAssignments, generateAssignment, generateBookmaker } from '../utils/mocks';

function createPromise(data) {
  const promise = new Promise(((resolve, reject) => {
    setTimeout(() => {
      if (faker.random.number(10) % 3 === 140) {

        reject('error');
      } else {
        resolve(data);
      }
    },
      faker.random.number(100)
    );
  }));
  return promise;
}


export const BiddingApi = {
  /**
     * Calls 'place bet' api endpoint
     *
     * @param {string|number} assignmentId - id of assignment
     * @param {number} volume - money amount
     * @param {string|number} odds - win chances
     *
     * @return {Promise} - promise with assignments or error
     */
  placeBet(assignmentId, volume, odds) {
    const data = {
      id: faker.random.number(10000),
      volume: Number.parseInt(volume),
      assignmentId,
      odds
    };

    const response = Object.assign({}, data, {
      datePlaced: (new Date(Date.now())).toString(),
      status: 'success',
      bookmaker: `${faker.name.firstName()} ${faker.name.lastName()}`
    });

    return createPromise(response);
  },

  addComment(assignmentId, text) {
    const data = {
      id: faker.random.number(10000),
      assignmentId,
      text,
      authorName: `${faker.name.firstName()} ${faker.name.lastName()}`

    };
    return createPromise(data);
  },

  setStatus(assignmentId, status) {
    return createPromise({ assignmentId, status });
  },

  loadAssignments() {
    return createPromise(generateAssignments());
  },

  loadAssignment(id) {
    return createPromise(generateAssignment(id));
  },
  loadBookmakers() {
    let data = [];
    let len = faker.random.number(3);
    for (let i = 0; i < 3; i++) {
      data.push(generateBookmaker(i))
    }

    return createPromise(
      { items: data });
  }
};

export default BiddingApi;
