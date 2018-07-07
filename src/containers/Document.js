import React from 'react';
import SearchAndReplace from '../components/SearchAndReplace';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

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
            <Grid style={{ 'margin-top': '20px' }} container>
                <Grid item xs={12} sm={6}>English</Grid>
                <Grid item xs={12} sm={6}>Translation</Grid>
            </Grid>
            <Grid style={{ 'margin-top': '5px' }} container data-e2e="segments">
                {Array.from(segmentsCollection).map((x, i) => {
                    return (
                        <Grid style={{ 'margin-bottom': '10px' }} container key={i}>
                            <Grid item xs={12} sm={5} style={{ 'margin-right': '10px' }}>{x.source}</Grid>
                            <Grid item xs={12} sm={5}>
                                <Input
                                    value={x.target}
                                    onChange={event => registerSegmentChanges(event, i)}
                                />
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
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