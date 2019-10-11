import * as faker from 'faker';
import { addComment } from '@babel/types';


export const BiddingApi = {

    getPromise(data) {

        let promise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (faker.random.number(10) % 9 == 0) {
                    reject("error")
                } else {
                    resolve(data);
                }
            }, faker.random.number(500));
        });
        return promise;
    },

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

        return this.getPromise(response);
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


    generateBet(count, assignmentId) {
        if (!count) {
            count = 1;
        }
        var data = [];

        for (var i = 0; i < count; i++) {
            data.push({
                id: faker.random.number(1000000),
                volume: faker.random.number({ min: 100, max: 30000 }),
                assignmentId,
                odds: `1.${faker.random.number(9)} : 1`,
                bookmaker: `${faker.name.firstName()} ${faker.name.lastName()}`
            })
        }

        return data
    },

    loadAssignments() {

        var data = [];
        let length = faker.random.number({ min: 5, max: 11 });
        for (var i = 0; i < length; i++) {
            var id = faker.random.number(3123);
            data.push({
                id,
                number: 1,
                cutterId: faker.random.number({ min: 1, max: 3 }),
                location: "Kolkata",
                startDateTime: "2019-02-27T14:30:00",
                amount: faker.random.number(200000),
                timeSpan: faker.random.number({ min: 100, max: 250 }) * 1000,
                placedBets: [...this.generateBet(faker.random.number({ min: 1, max: 5 }),id)],
                // betRecommendations: [
                //     {
                //         source: "L (Pune - on course)",
                //         betType: "FixedOddsWins",
                //         transactions: [
                //             {
                //                 transactionsId: `trans${faker.random.number(2000)}`,
                //                 accountId: faker.random.number(100000),
                //                 hourse: faker.name.firstName(),
                //                 runnerNo: faker.random.number(36),
                //                 odds: 1.2,
                //                 stake: faker.random.number(1000) * 1000,
                //                 timestamp: Date.now.toString(),
                //                 timeout: faker.random.number(200)
                //             }
                //         ]
                //     }
                // ]
            });
        }

        return this.getPromise(data);
    }
}