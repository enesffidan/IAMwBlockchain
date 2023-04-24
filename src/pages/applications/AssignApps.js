import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    // overflowY: "auto",
    maxHeight: "700px",
    margin: "0 auto",
    textAlign: "left",
    padding: 10,
    marginBottom: 10,
    border: "solid",
    borderWidth: "thin",
    borderRadius: "10px",
  },
  typo: {
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    margin: "10px 1rem 0",
  },
  cancelButton: {
    backgroundColor: "white",
    maxWidth: 200,
    margin: "10px 1rem 0",
  },
  saveButton: {
    color: "white",
    maxWidth: 200,
    margin: "10px 1rem 0",
  },
  box: {
    display: "flex",
    backgroundColor: "#D9D9D9",
    border: "solid",
    borderWidth: "2px",
    borderRadius: 5,
    width: 359,
  },
  formLabel: {
    padding: 10,
    fontWeight: "bold",
    color: "black",
  },
  divider: {
    height: 1,
    width: 356,
    marginLeft: -3,
    backgroundColor: "black",
  },
  formControl: {
    margin: 3,
  },
}));

export default function AssignApps() {
  const classes = useStyles();
  const history = useHistory();

  const [apps, setApps] = React.useState([{ name: "Facebook", id: "1" }]);
  const [selectedApps, setSelectedApps] = React.useState([]);

  const [users, setUsers] = React.useState([
    { name: "Onur Cihangir", id: "1" },
  ]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const handleAppSelect = (event) => {
    // create copy of array
    let temp = [...selectedApps];
    // find index of selected app
    const index = temp.indexOf(event.target.id);
    // if it is already selected
    if (index !== -1) {
      // remove selected app's id from array
      temp.splice(index, 1);
    } else {
      // if it is not selected, add its id to array
      temp.push(event.target.id);
    }
    setSelectedApps(temp);
  };

  const handleUserSelect = (event) => {
    // create copy of array
    let temp = [...selectedUsers];
    // find index of selected user
    const index = temp.indexOf(event.target.id);
    // if it is already selected
    if (index !== -1) {
      // remove selected user's id from array
      temp.splice(index, 1);
    } else {
      // if it is not selected, add its id to array
      temp.push(event.target.id);
    }
    setSelectedUsers(temp);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typo} variant="h5" gutterBottom>
        Assign Applications
      </Typography>

      <Grid
        container
        spacing={6}
        className={classes.gridContainer}
        justifyContent="center"
      >
        <Grid item xs={12} sm={6} md={6}>
          <Box className={classes.box}>
            <FormControl
              className={classes.formControl}
              component="fieldset"
              variant="standard"
            >
              <FormLabel
                component="legend"
                focused={false}
                className={classes.formLabel}
              >
                Application
              </FormLabel>
              <Divider className={classes.divider} />
              <FormGroup>
                {apps.map((app) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={}
                          onChange={handleAppSelect}
                          id={app.id}
                        />
                      }
                      label={app.name}
                    />
                    <Divider className={classes.divider} />
                  </>
                ))}
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box className={classes.box}>
            <FormControl
              className={classes.formControl}
              component="fieldset"
              variant="standard"
            >
              <FormLabel
                component="legend"
                focused={false}
                className={classes.formLabel}
              >
                People
              </FormLabel>
              <Divider className={classes.divider} />
              <FormGroup>
                {users.map((user) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleUserSelect} id={user.id} />
                      }
                      label={user.name}
                    />
                    <Divider className={classes.divider} />
                  </>
                ))}
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => history.push("/apps")}
          className={classes.cancelButton}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          // onClick={() => onButtonClick()}
          className={classes.saveButton}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
