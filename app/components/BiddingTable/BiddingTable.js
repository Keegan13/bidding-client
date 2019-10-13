import React from 'react';
import BiddingCard from 'components/BiddingCard';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BetForm from './BetForm/BetForm';
import LoadingIndicator from 'components/LoadingIndicator';
import './style.scss';


/**
 * @todo change to functional component
 */
class BiddingTable extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log("rendering table");
        const { assignment, reloadAssignment } = this.props;


        if (!assignment) {
            return <LoadingIndicator />;
        }

        console.log(assignment.placedBets.length);
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
                    <div>
                        <BetForm></BetForm>
                    </div>
                </div>
                <div>
                    <Paper >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Volume</TableCell>
                                    <TableCell align="right">Odds</TableCell>
                                    <TableCell align="right">Bookmaker</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {assignment.placedBets.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="right">{row.volume}</TableCell>
                                        <TableCell align="right">{row.odds}</TableCell>
                                        <TableCell align="right">{row.bookmaker}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        </div>)
    }
}

export default BiddingTable;