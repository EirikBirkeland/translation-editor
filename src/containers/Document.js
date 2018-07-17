import React from 'react';
import SearchAndReplace from '../components/SearchAndReplace';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';

const styles = theme => ({
    searchAndReplace: {
        padding: '50px',
    },
    document: {
        maxWidth: 800,
    },

});

const Document = ({ classes, segmentsCollection, registerSegmentChanges, searchReplace }) => {
    return (
        <Grid className={classes.document} container>
            <Grid item xs={12} sm={12}><Paper><SearchAndReplace searchReplace={searchReplace} /></Paper></Grid>
            <Grid style={{ marginTop: '20px' }} container>
                <Grid item xs={11} sm={5}>English</Grid>
                <Grid item xs={11} sm={5}>Translation</Grid>
                <Grid item xs={1} sm={2}>Status</Grid>
            </Grid>
            <span data-e2e="segments">
                <Grid style={{ marginTop: '5px' }} container>
                    {Array.from(segmentsCollection).map((x, i) => {
                        return (
                            <Grid style={{ marginBottom: '10px' }} container key={i}>
                                <Grid item xs={12} sm={5} style={{ marginRight: '10px' }}>
                                    <Typography>{x.source}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField id={"segment-" + (i+1)} className="input" multiline
                                        value={x.target}
                                        onChange={event => registerSegmentChanges(event, i)}
                                    ></TextField>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            </span>
        </Grid>
    );
}

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