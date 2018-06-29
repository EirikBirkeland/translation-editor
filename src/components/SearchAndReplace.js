import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

export default class SearchAndReplace extends React.Component {
    constructor(props) {
        super();
        this.state = {
            regex: false,
        };
    }

    render() {
        const props = this.props;

        return (
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault();

                    const {find, replace, regex, replaceAll, caseInsensitive } = event.target.elements;

                    props.onSubmitForm(find.value, replace.value, {
                        caseInsensitive: caseInsensitive.value,
                        regex: regex.value,
                        replaceAll: replaceAll.value
                    })
                }
                }>
                    <span className="input-wrapper">
                        <label><em>Find:</em></label>
                        <Input type="text" name="find" id="find"/>
                    </span>
                    <span className="input-wrapper">
                        <label><em>Replace:</em></label>
                        <Input id="replace" name="replace"/>
                    </span>

                    <br />
                    
                    <Button type="submit" variant="contained" color="primary" size="small">Apply</Button>

                    <span>
                        <label>Regex</label>
                        <Checkbox
                            id="regex" name="regex"
                            onClick={() => this.setState({ regex: !this.state.regex })}
                        />
                    </span>

                    <span style={{ display: !this.state.regex ? "none" : "" }}>
                        <label>Case-insensitive</label>
                        <Checkbox
                            id="caseInsensitive" name="caseInsensitive"
                            disabled={!this.state.regex}
                        />
                    </span>

                    <span style={{ display: !this.state.regex ? "none" : "" }}>
                        <label>Replace all</label>
                        <Checkbox
                            id="replaceAll" name="replaceAll"
                            disabled={!this.state.regex}
                        />
                    </span>
                </form>
            </div>
        );
    }
}