import React from 'react';
import BiddingCard from 'components/BiddingCard';
import BetForm from './BetForm';
import LoadingIndicator from 'components/LoadingIndicator';
import BetTable from './BetTable';
import './style.scss';

const getAmountLeft = (assignment) => {
    let placed = assignment.placedBets.reduce((agg, next) => agg += next.volume, 0);
    return assignment.amount - placed;
};

/**
 * @todo change to functional component
 */
class BiddingTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const { assignment, reloadAssignment } = this.props;
        if (!assignment) {
            return <LoadingIndicator />;
        }
        return (<div className="bidding-container">
            <div className="">
                <BiddingCard item={assignment} />
                <div>
                    <p>Comments</p>
                    <textarea className="feedback-area"></textarea>
                </div>
                <button className="btn btn-primary" onClick={() => reloadAssignment(assignment.id)}>Reload</button>
            </div>
            <div>
                <div>
                    <h4>Left: {getAmountLeft(assignment)}</h4>
                    <div>
                        <BetForm />
                    </div>
                </div>
                <div>
                    <BetTable bets={assignment.placedBets}></BetTable>
                </div>
            </div>
        </div>)
    }
}

export default BiddingTable;