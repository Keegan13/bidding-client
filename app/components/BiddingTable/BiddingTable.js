import React from 'react';
import BiddingCard from 'components/BiddingCard';
import BetForm from './BetForm';
import LoadingIndicator from 'components/LoadingIndicator';
import BetTable from './BetTable';
import StatusSwitch from './StatusSwitch';
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

        this.state = {
            text: ''
        };

        this.addComment = (assignmentId) => {
            const { text } = this.state;
            const { addComment } = this.props;
            addComment(assignmentId, text);
        };

        this.onCommentChange = (event) => {
            const { value } = event.target;
            this.setState({ text: value });
        }
    }

    render() {
        const { assignment, reloadAssignment, setStatus } = this.props;
        if (!assignment) {
            return <LoadingIndicator />;
        }
        return (<div className="bidding-container">
            <div className="">
                <BiddingCard assignment={assignment} />
                <StatusSwitch assignment={assignment} onStatusChange={({ assignmentId, status }) => setStatus(assignmentId, status)} />
                <div>
                    <p>Comments</p>
                    {assignment.comments ? assignment.comments.map(item =>
                        <p key={item.id}>{item.text}</p>
                    ) : null}
                    <textarea className="feedback-area" value={this.state.text} onChange={this.onCommentChange}></textarea>
                </div>
                <button onClick={() => this.addComment(assignment.id)}>Add</button>
                {/* <button className="btn btn-primary" onClick={() => reloadAssignment(assignment.id)}>Reload</button> */}
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