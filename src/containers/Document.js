import React from 'react';
import SearchAndReplace from '../components/SearchAndReplace';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { connect } from 'react-redux';

const styles = theme => ({
    table: {
        maxWidth: 600,
    },
});

const Document = ({ classes, segmentsCollection, registerSegmentChanges, searchReplace }) => {
    return (
        <div style={{ maxWidth: "70%" }}>
            <div style={{ border: "1px solid", padding: "5px" }}><SearchAndReplace searchReplace={searchReplace} /></div>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>English</TableCell>
                        <TableCell>Translation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody data-e2e="segments">
                    {Array.from(segmentsCollection).map((x, i) => {
                        return (
                            <TableRow key={i}>
                                <TableCell>{x.source}</TableCell>
                                <TableCell>
                                    <input
                                        value={x.target}
                                        onChange={event => registerSegmentChanges(event, i)}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>

        </div>
    );
}

/*
handleInputChange = (event, i) => {
    const newCollection = Object.assign([], this.state.segmentsCollection);
    newCollection[i].target = event.target.value;

    this.props.dispatch(registerSegmentChanges(event.target.value, i));
};

onSubmitForm = 
*/

const mapStateToProps = state => ({
    segmentsCollection: state.segments,
});

const mapDispatchToProps = dispatch => ({
    registerSegmentChanges: (event, index) => dispatch(
        {
            type: 'CHANGE_SEGMENT_CONTENT',
            value: event.target.value,
            index: index
        }
    ),
    searchReplace: (findValue, replaceValue, options) => dispatch(
        {
            type: 'SEARCH_REPLACE',
            findValue,
            replaceValue,
            options
        }
    )
});

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Document));    