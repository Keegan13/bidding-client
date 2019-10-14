import * as _ from 'lodash';
import faker from 'faker';
import { generateAssignment } from 'utils/mocks';

const mockConnection = {
    callBacks: [],
    start: function () {
        const loop = (() => {
            let rand = faker.random.number({ min: 20, max: 60 }) * 1000;
            setTimeout(() => {
                const newAssignment = generateAssignment();
                console.log('generated new assignment with id ' + newAssignment.id);
                this.callBacks.forEach((cb) => {
                    cb.call(null, newAssignment);
                });
                loop();
            }, rand);
        }).bind(this);

        loop();

        let result = new Promise((resolve, reject) => {
            if (faker.random.number(50) % 27 == 0) {
                throw new Error("Random error occurred");
            }

            resolve(this);
        });

        return result;
    },
    on: function (eventName, callback) {
        this.callBacks.push(callback);
    }
}

export default mockConnection;