import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Avatar, Divider, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from "react-router-dom";
import { TextArea } from "../../components/Fields/TextField";
import Request from "../../helpers/Request";
import fbLogo from "../../assets/Facebook_Logo_(2019).png";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingTop: 5,
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  root: {
    // display: "flex",
    // flexDirection: "column",
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
  header: {
    fontWeight: "bold",
  },
  typo: {
    fontWeight: "bold",
    padding: 10,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
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
    // display: "flex",
    // flexDirection: "row",
    marginLeft: "40px",
    marginRight: "40px",
    backgroundColor: "#D9D9D9",
    border: "solid",
    borderWidth: "2px",
    borderRadius: 5,
    // width: 359,
  },
  appnameRow: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 15,
    paddingBottom: 5,
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  appname: {
    fontSize: "15px",
    paddingLeft: 5,
  },
  divider: {
    height: 1,
    width: 356,
    marginLeft: -3,
    backgroundColor: "black",
  },
  textField: {
    marginTop: 5,
    whiteSpace: "pre-wrap",
    backgroundColor: "white",
  },
}));

export default function AssignAppsNext() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { appname, targetUsername } = location.state;
  console.log(appname, targetUsername);

  const [apps, setApps] = React.useState([]);
  const [selectedApps, setSelectedApps] = React.useState([]);

  const [users, setUsers] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const [accountProps, setAccountProps] = React.useState({});

  const onButtonClick = async () => {
    const props = { ...accountProps, username: targetUsername, appname };
    const resp = await Request("post", "/adminAddCredentials", props);
    console.log(resp);
  };

  const getUsers = useCallback(async () => {
    const users = await Request("get", "/fetchUsers");
    setUsers(users.data.users);
  }, []);

  const getApps = useCallback(async () => {
    const allApps = await Request("get", "/requestAppDisplay");
    console.log(allApps);
    setApps(allApps.data);
  }, []);

  useEffect(() => {
    getApps();
    getUsers();
  }, [getApps, getUsers]);

  return (
    <div className={classes.root}>
      <Typography className={classes.header} variant="h5" gutterBottom>
        Assign Applications
      </Typography>

      {/* <Grid
        container
        spacing={6}
        className={classes.gridContainer}
        justifyContent="center"
      >
        <Grid item xs={12} sm={6} md={12}> */}
      <Box className={classes.box}>
        <Typography className={classes.typo}>Enter User Attributes</Typography>
        <div className={classes.appnameRow}>
          <Avatar className={classes.avatar} alt="app" src={fbLogo} />
          <Typography className={classes.appname}>{appname}</Typography>
        </div>
        <Divider />
        <Grid
          container
          spacing={1}
          className={classes.gridContainer}
          justifyContent="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <Typography className={classes.appname}>Person</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Typography className={classes.appname}>
              User Spesific Fields
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          spacing={3}
          className={classes.gridContainer}
          justifyContent="center"
        >
          <Grid item xs={12} sm={6} md={6}>
            <Typography className={classes.appname}>
              {targetUsername}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextArea //User NAME
              label={"User Name"}
              // value={""}
              onChangeFunc={(value) => {
                setAccountProps({
                  ...accountProps,
                  appUsername: value.target.value,
                });
              }}
              style={classes.textField}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label={"Password"}
              type="password"
              onChange={(value) => {
                setAccountProps({
                  ...accountProps,
                  appPassword: value.target.value,
                });
              }}
              className={classes.textField}
            />
          </Grid>
        </Grid>
      </Box>
      {/* </Grid>
      </Grid> */}
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
          onClick={() => onButtonClick()}
          className={classes.saveButton}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
