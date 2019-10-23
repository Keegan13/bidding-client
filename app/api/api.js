import request from './request';

const baseOptions = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    credentials: 'include', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    }
};

const apiService = {

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
        return request('/BetBroker/BetRecommendation/GetRecommendations', baseOptions);
    },

    loadAssignment(id) {
        return createPromise(generateAssignment(id));
    },
    loadBookmakers() {
        return request('/BetBroker/BetRecommendation/GetAssignments', baseOptions);
    }
}

export default apiService;