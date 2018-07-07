import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    searchAndReplace: {
        padding: '5px',
    },

});

class SearchAndReplace extends React.Component {

    constructor(props) {
        super();
    }

    state = {
        regex: false,
    }

    render() {
        const { searchReplace, classes } = this.props;
        const { regex } = this.state;
        const invert = (prevState) => this.setState({ regex: !regex });

        return (
            <ExpansionPanel className={classes.searchAndReplace}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
                    Search & Replace
            </ExpansionPanelSummary>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    debugger;
                    const { find, replace, regex, replaceAll, caseInsensitive } = event.target.elements;
                    searchReplace(find.value, replace.value, {
                        caseInsensitive: caseInsensitive.checked,
                        regex: regex.checked,
                        replaceAll: replaceAll.checked
                    });
                }
                }>
                    <Grid container>
                        <Grid item xs={12} sm={6} className="input-wrapper">
                            <label><em>Find:</em></label>
                            <Input type="text" name="find" id="find" />
                        </Grid>
                        <Grid item xs={12} sm={6} className="input-wrapper">
                            <label><em>Replace:</em></label>
                            <Input id="replace" name="replace" />
                        </Grid>
                    </Grid>
                    <br />

                    <Button type="submit" variant="contained" color="primary" size="small">Apply</Button>

                    <span>
                        <label>Regex</label>
                        <Checkbox
                            id="regex" name="regex"
                            onClick={invert}
                        />
                    </span>

                    <span style={{ display: !regex ? "none" : "" }}>
                        <label>Case-insensitive</label>
                        <Checkbox
                            id="caseInsensitive" name="caseInsensitive"
                            disabled={!regex}
                        />
                    </span>

                    <span style={{ display: !regex ? "none" : "" }}>
                        <label>Replace all</label>
                        <Checkbox
                            id="replaceAll" name="replaceAll"
                            disabled={!regex}
                        />
                    </span>
                </form>
            </ExpansionPanel>
        );
    }
};

export default withStyles(styles)(SearchAndReplace);