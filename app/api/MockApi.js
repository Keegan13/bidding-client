import * as faker from 'faker';
import { addComment } from '@babel/types';

export const BiddingApi = {

    getPromise(data) {

        let promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (faker.random.number(10) % 9==0) {
                    reject("error")
                } else {
                    resolve(data);
                }
            }, faker.random.number(2000));
        });
        return promise;
    },

    addBid(bidId, volume, race) {
        var data = {
            id: faker.random.number(10000),
            volume,
            bidId,
            race
        };
        return this.getPromise(faker.name.firstName());
    },

    addComment(bidId, text) {
        var data = {
            id: faker.random.number(10000),
            text: text,
            bidId: bidId,
            authorName: `${faker.name.firstName()} ${faker.name.lastName()}`
        };

        return this.getPromise(data);
    },

    loadAssignments() {

        var data = [];
        let length=faker.random.number({min:5,max:11});
        for (var i = 0; i < length; i++) {
            data.push({
                id: "20190227;Kolkata;1",
                number: 1,
                location: "Kolkata",
                startDateTime: "2019-02-27T14:30:00",
                betRecommendations: [
                    {
                        source: "L (Pune - on course)",
                        betType: "FixedOddsWins",
                        transactions: [
                            {
                                transactionsId: `trans${faker.random.number(2000)}`,
                                accountId: faker.random.number(100000),
                                hourse: faker.name.firstName(),
                                runnerNo: faker.random.number(36),
                                odds: 1.2,
                                stake: faker.random.number(1000) * 1000,
                                timestamp: Date.now.toString(),
                                timeout: faker.random.number(200)
                            }
                        ]
                    }
                ]
            });
        }

        return this.getPromise(data);
    }
}