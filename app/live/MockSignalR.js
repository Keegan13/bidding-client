import faker from 'faker';
import { generateAssignment } from 'utils/mocks';

const mockConnection = {
  callBacks: [],
  start() {
    const loop = (() => {
      const rand = faker.random.number({ min: 20, max: 60 }) * 1000;
      setTimeout(() => {
        const newAssignment = generateAssignment(null, 'new');
        this.callBacks.forEach((cb) => {
          cb.call(null, newAssignment);
        });
        loop();
      }, rand);
    });

    loop();

    const result = new Promise((resolve, reject) => {
      if (faker.random.number(50) % 27 === 0) {
        throw new Error('Random error occurred');
      }

      resolve(this);
    });

    return result;
  },
  on(eventName, callback) {
    this.callBacks.push(callback);
  }
};

export default mockConnection;
