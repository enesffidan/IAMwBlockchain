import React, {useCallback, useEffect} from "react";
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
import Request from "../../helpers/Request";

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
    // width: 359,
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

export default function AssignAppsNext() {
  const classes = useStyles();
  const history = useHistory();

  const [apps, setApps] = React.useState([]);
  const [selectedApps, setSelectedApps] = React.useState([]);

  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const getUsers = useCallback(async () => {
    const users = await Request("get", "/fetchUsers");
    setUsers(users.data.users);
  }, []);

  const getApps = useCallback(async () => {
    const allApps = await Request("get", "/requestAppDisplay");
    console.log(allApps)
    setApps(allApps.data);
  }, []);

  useEffect(() => {
    getApps();
    getUsers();
  }, [getApps, getUsers]);

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
        <Grid item xs={12} sm={6} md={12}>
          <Box className={classes.box}>
            <Typography>
                Enter User Attributes
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
        //   onClick={() => history.push("/apps")}
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
          Confirm
        </Button>
      </div>
    </div>
  );
}
