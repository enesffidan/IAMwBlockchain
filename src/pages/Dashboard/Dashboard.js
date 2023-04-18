import React from "react";
import { makeStyles } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";

const useStyles = makeStyles()((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
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
}));

export default function Dashboard() {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.typo} variant="h5" gutterBottom>
        Overview
      </Typography>
      <Divider color="black" sx={{ height: 1, width: "100%" }} />
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
            1
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography className={classes.typo} variant="h6" gutterBottom>
            3
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
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
