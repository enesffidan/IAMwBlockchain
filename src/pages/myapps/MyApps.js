import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import logo from "../../assets/GitHub-Mark.png";
import { CardMedia } from "@material-ui/core";
import Request from "../../helpers/Request";
import { CardActionArea } from "@material-ui/core";
import fblogo from "../../assets/Facebook_Logo_(2019).png";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
    display: "flex",
    justifyContent: "flex-start",
  },
  root: {
    minWidth: 200,
  },
  cardMedia: {
    objectFit: "contain",
  },
  typo: {
    fontWeight: "600",
  },
}));

export default function MyApps() {
  const classes = useStyles();

  const [apps, setApps] = useState([]);

  const getMyApps = useCallback(async () => {
    const resp = await Request("get", "/myApps");
    console.log(resp);
    setApps(resp.data.apps);
  }, []);

  useEffect(() => {
    getMyApps();
  }, []);

  async function handleOnClick() {
    const resp = await Request("get", "/appInstance", null);
    console.log(resp);
  }

  return (
    <Grid
      container
      spacing={6}
      className={classes.gridContainer}
      justifyContent="center"
    >
      {apps.map((app) => {
        return (
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.root} variant="outlined">
              <CardActionArea onClick={handleOnClick}>
                <CardMedia
                  component="img"
                  height="150"
                  image={logo}
                  alt="github"
                  className={classes.cardMedia}
                />
                <CardContent>
                  <Typography
                    color="textPrimary"
                    className={classes.typo}
                    gutterBottom
                  >
                    {app.appname}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}

      {/* <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root} variant="outlined">
          <CardMedia
            component="img"
            height="150"
            image={fblogo}
            alt="fb"
            className={classes.cardMedia}
          />
          <CardContent>
            <Typography
              color="textPrimary"
              className={classes.typo}
              gutterBottom
            >
              Facebook
            </Typography>
          </CardContent>
        </Card>
      </Grid> */}
    </Grid>
  );
}
