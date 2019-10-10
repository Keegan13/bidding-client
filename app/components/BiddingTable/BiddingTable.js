import React from 'react';
import BiddingCard from 'components/BiddingCard';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './style.scss';
import { loadAssignmentsThunk } from '../../api/thunks';

class BiddingTable extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        const { loadAssignments } = this.props;
        loadAssignments();
    }

    onBidSplitSubmit() {



    }

    render() {
        const { assignments } = this.props;
        const bids = [{
            id: 2,
            volume: 300,
            odds: "1.2 : 1",
            bookmaker: "Rick James"
        }, {
            id: 3,
            volume: 3400,
            odds: "1.4 : 1",
            bookmaker: "Rick James"
        }, {
            id: 4,
            volume: 10000,
            odds: "1.5 : 1",
            bookmaker: "Rick James"
        }];


        return (<div className="bidding-container">
            <div>
                <BiddingCard assignment={assignments&&assignments.length>0?assignments[0]:null} />
                <div>
                    <p>Comments</p>
                    <textarea className="feedback-area"></textarea>
                </div>

            </div>
            <div>
                <div>
                    <form>
                        <label>
                            Volume
                        </label>
                        <input>
                        </input>
                        <label>
                            Odds
                        </label>
                        <input></input>
                        <input></input>
                        <button>Add</button>
                    </form>
                </div>
                <div>
                    <Paper >
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell align="right">Volumne</TableCell>
                                    <TableCell align="right">Odds</TableCell>
                                    <TableCell align="right">Bookmaker</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bids.map(row => (
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