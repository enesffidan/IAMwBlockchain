import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import Request from "../../helpers/Request";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingTop: 10,
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
  circle: {
    borderRadius: 5,
    height: 5 * 2,
    width: 5 * 2,
    marginRight: 5,
    display: "inline-block",
  },
  gridClass: {
    display: "flex",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#000000",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  const [apps, setApps] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const getAllApps = useCallback(async () => {
    const resp = await Request("get", "/requestAppDisplay");
    setApps(resp.data);
  }, []);

  const getUsers = useCallback(async () => {
    const users = await Request("get", "/fetchUsers");
    setUsers(users.data.users);
  }, []);

  useEffect(() => {
    getAllApps();
    getUsers();
  }, [getAllApps, getUsers]);

  return (
    <div className={classes.root}>
      <Typography className={classes.typo} variant="h5" gutterBottom>
        Overview
      </Typography>
      <Divider className={classes.divider} />
      <Grid
        container
        spacing={6}
        className={classes.gridContainer}
        justify="center"
      >
        <Grid item xs={12} sm={6} md={4}>
          <Typography className={classes.typo} variant="h6" gutterBottom>
            Users
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography className={classes.typo} variant="h6" gutterBottom>
            Single Sign-on Apps
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography className={classes.typo} variant="h6" gutterBottom>
            Status
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography className={classes.typo} variant="h6" gutterBottom>
            {users.length}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography className={classes.typo} variant="h6" gutterBottom>
            {apps.length}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.gridClass}>
          <span
            className={classes.circle}
            style={{ backgroundColor: "green" }}
          />
          <Typography className={classes.typo} variant="body2" gutterBottom>
            Operational
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
