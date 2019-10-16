import * as faker from 'faker';
import * as _ from 'lodash';
import { generateAssignments, generateAssignment } from './../utils/mocks';

function createPromise(data) {

    let promise = new Promise(function (resolve, reject) {
        resolve(data);
        // setTimeout(function () {
        //     if (faker.random.number(10) % 9 == 0) {
        //         reject("error")
        //     } else {
        //         resolve(data);
        //     }
        // },
        //     //faker.random.number(1)
        //     1
        // );
    });
    return promise;
};


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
        var data = {
            id: faker.random.number(10000),
            volume: Number.parseInt(volume),
            assignmentId,
            odds
        };

        var response = Object.assign({}, data, {
            datePlaced: (new Date(Date.now())).toString(),
            status: 'success',
            bookmaker: `${faker.name.firstName()} ${faker.name.lastName()}`
        })

        return createPromise(response);
    },

    addComment(assignmentId, text) {
        var data = {
            id: faker.random.number(10000),
            assignmentId,
            text,
            authorName: `${faker.name.firstName()} ${faker.name.lastName()}`

        }
        return createPromise(data);
    },

    setStatus(assignmentId, status) {
        return createPromise({ assignmentId, status })
    },

    loadAssignments() {
        return createPromise(generateAssignments());
    },

    loadAssignment(id) {
        return createPromise(generateAssignment(id));
    }
}

export default BiddingApi;