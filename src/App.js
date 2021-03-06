import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import loremIpsum from './loremipsum';
import FileUploadIcon from '@material-ui/icons/FileUpload';
import MyAppBar from './components/MyAppBar';
import Document from './containers/Document';

const styles = theme => ({
  appTitle: {
    fontSize: "2em",
    color: "white",
  },
  container: {
    margin: "1em",
  },
  header: {
    backgroundColor: "#222",
    height: "75px",
    padding: "20px",
    color: "white",
    textAlign: "center",
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <header className={classes.header}>
          <h1 className={classes.appTitle}>Translation Workbench</h1>
        </header>

        <MyAppBar>
          <div>
            <Document />
          </div>
          <span>{loremIpsum()}</span>
          <span>{loremIpsum()}</span>
        </MyAppBar>

        <Button variant="contained" color="default">
          Upload
        <FileUploadIcon />
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(App);