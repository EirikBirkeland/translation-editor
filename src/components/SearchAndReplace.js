import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

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
            <div className={classes.searchAndReplace}>
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
                    <span className="input-wrapper">
                        <label><em>Find:</em></label>
                        <Input type="text" name="find" id="find" />
                    </span>
                    <span className="input-wrapper">
                        <label><em>Replace:</em></label>
                        <Input id="replace" name="replace" />
                    </span>

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
            </div>
        );
    }
};

export default withStyles(styles)(SearchAndReplace);