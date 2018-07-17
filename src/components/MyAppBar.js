import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import CloudIcon from '@material-ui/icons/Cloud';
import Profile from '@material-ui/icons/PermIdentity';

function TabContainer(child, id) {
    return (
        <Typography key={id} component="div" style={{ padding: 8 * 3 }}>
            {child}
        </Typography>
    );
}

const styles = theme => ({
    appBar: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class MyAppBar extends React.Component {

    state = {
        tab: 0,
    }

    handleChange = (event, tab) => {
        this.setState({ tab });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar className={classes.appBar} position="static">
                    <Tabs value={this.state.tab} onChange={this.handleChange}>
                        <Tab label="Edit Document" icon={<EditIcon />}/>
                        <Tab label="Files" icon={<CloudIcon />}/>
                        <Tab label="Profile" icon={<Profile />} />
                    </Tabs>
                </AppBar>
                {this.props.children.map((child, i) => {
                    if(i === this.state.tab) {
                        return TabContainer(child, i);
                    }
                    return null;
                })}
            </div>
        )
    }
}

export default withStyles(styles)(MyAppBar);