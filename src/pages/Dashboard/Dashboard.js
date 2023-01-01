import React from "react";
import { makeStyles } from "tss-react/mui";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import logo from "../../assets/GitHub-Mark.png";
import { CardMedia } from "@mui/material";
import Request from "../../helpers/Request";
import { CardActionArea } from "@mui/material";

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

  async function handleOnClick() {
    const resp = await Request("get", "/appInstance", null);
    console.log(resp);
  }

  return (
    <Grid
      container
      spacing={6}
      className={classes.gridContainer}
      justify="center"
    >
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.root} variant="outlined">
          <CardActionArea onClick={handleOnClick}>
            <CardMedia
              component="img"
              height="150"
              image={logo}
              alt="github"
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography color="textPrimary" fontWeight={"600"} gutterBottom>
                Github
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}
