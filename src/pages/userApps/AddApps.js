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
  const [allApps, setAllApps] = React.useState([]);


  const getApps = useCallback(async () => {
    // const allApps = await Request('get', '/requestAppDisplay');
    // setAllApps(allApps.data);
    const myApps = await Request("get", "/myApps");
    console.log(myApps)
    setApps(myApps.data);
  }, []);

  useEffect(() => {
    getApps();
  }, [getApps]);

  const handleOpenModal = () => {
    setModalLoading(true);
    setModal(true);
    setModalLoading(false);
  };

  return (
    <div className={classes.root}>
      <AddAppModal
        modal={modal}
        modalLoading={modalLoading}
        setModal={setModal}
      />
      <Typography color="textPrimary" gutterBottom className={classes.header}>
        Application Catalogue
      </Typography>
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
            Github
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
