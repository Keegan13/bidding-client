import React, { useState } from 'react';
import * as _ from 'lodash';
import './styles.scss';

function parseOdds(p, q) {
    let _p = Number.parseInt(p);
    let _q = Number.parseInt(q);

    if (_p > _q) {
        _p /= _q;
        _q = 1;
    }
    else {
        _q /= _p;
        _p = 1;
    }

    return {
        p: Math.round(_p * 10) / 10,
        q: Math.round(_q * 10) / 10
    }
}


const BetForm = (props) => {
    const { placeBet, assignment } = props;

    const [getState, setState] = useState({
        volume: '',
        odds1: '',
        odds2: ''
    });

    const getAmountLeft = (assignment) => {
        let placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
        let left = assignment.amount - placed;

        return left > 0 ? left : 0;
    };

    const onPlaceBetSubmit = () => {
        if (getAmountLeft(assignment) >= getState.volume) {
            let odds = parseOdds(getState.odds1, getState.odds2);
            placeBet(assignment.id, getState.volume, `${odds.p} : ${odds.q}`);
        }
    };

    const onPlaceAllClick = () => {
        setState({ volume: getAmountLeft(assignment) });
    };

    return (
        <div className="place-bet-form">
            <div className="form-group">
                <label htmlFor="volume-form-input">Volume</label>
                <input id="volume-form-input" value={getState.volume} onChange={(e) => setState({ volume: e.target.value })} />
                <button className="input-button" onClick={onPlaceAllClick}>Place all</button>
            </div>

            <label>Odds</label>
            <input className="odds-input" value={getState.odds1} onChange={(e) => setState({ odds1: e.target.value })} />
            <span>-</span>
            <input className="odds-input" value={getState.odds2} onChange={(e) => setState({ odds2: e.target.value })} />

            <button type="button" onClick={onPlaceBetSubmit}>Add</button>
        </div>
    )
};


export default BetForm;