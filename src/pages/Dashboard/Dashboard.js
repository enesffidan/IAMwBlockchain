import React from "react";
import { makeStyles } from "tss-react/mui";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles()((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  root: {
    minWidth: 200,
  },
}));

export default function Dashboard() {
  const { classes } = useStyles();

  return (
    <Grid
      container
      spacing={4}
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Word of the Day
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
