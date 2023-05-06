import React, { useCallback, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";
import { Button, CardMedia } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../assets/GitHub-Mark.png";
import AddAppModal from "./AddAppModal";
import Request from "../../helpers/Request";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 665,
    // height: 133,
    borderColor: "black",
    flexDirection: "row",
    display: "flex",
    // paddingLeft: '58px'
    marginBottom: 10,
  },
  cardContent: {
    width: 600,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 10,
  },
  root: {
    position: "absolute",
    left: 377,
    top: 133,
  },
  header: {
    fontSize: "24",
    display: "flex",
    alignItems: "left",
    paddingBottom: 5,
    fontWeight: "600",
  },
  cardMedia: {
    objectFit: "contain",
    width: 101,
  },
  cardTypo: {
    fontSize: "24",
    marginRight: 30,
    fontWeight: "600",
  },
}));

export default function AddApps() {
  const classes = useStyles();

  const [modal, setModal] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

  const [apps, setApps] = React.useState([]);
  const [selectedApp, setSelectedApp] = React.useState(null);

  const getApps = useCallback(async () => {
    const allApps = await Request("get", "/requestAppDisplay");
    const myApps = await Request("get", "/myApps");
    if (myApps.data.apps.length == 0) {
      setApps(allApps.data);
    } else {
      const apps = allApps.data.filter(
        (o) => !myApps.data.apps.some((i) => i.id === o.id)
      );
      setApps(apps);
    }
  }, []);

  useEffect(() => {
    getApps();
  }, [getApps]);

  const handleOpenModal = (app) => {
    setModalLoading(true);
    setModal(true);
    setSelectedApp(app.id);
    setModalLoading(false);
  };

  return (
    <div className={classes.root}>
      <AddAppModal
        modal={modal}
        modalLoading={modalLoading}
        setModal={setModal}
        selectedApp={selectedApp}
      />
      <Typography color="textPrimary" gutterBottom className={classes.header}>
        Application Catalogue
      </Typography>
      {apps.map((app) => {
        return (
          <Card className={classes.card} variant="outlined">
            <CardMedia
              component="img"
              height="150"
              image={logo}
              alt="github"
              className={classes.cardMedia}
            />
            <CardContent className={classes.cardContent}>
              <Typography
                color="textPrimary"
                gutterBottom
                className={classes.cardTypo}
              >
                {app.appname}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(app)}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
