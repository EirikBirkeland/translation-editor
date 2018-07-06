import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';

const SearchAndReplace = ({ searchReplace }) => {
    let regex = false;

    return (
        <div>
            <form onSubmit={(event) => {
                event.preventDefault();

                const { find, replace, regex, replaceAll, caseInsensitive } = event.target.elements;

                searchReplace(find.value, replace.value, {
                    caseInsensitive: caseInsensitive.value,
                    regex: regex.value,
                    replaceAll: replaceAll.value
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
                        onClick={() => regex = !regex}
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
};

export default SearchAndReplace;