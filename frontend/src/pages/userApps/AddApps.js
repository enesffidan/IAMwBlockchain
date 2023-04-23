import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/Card";
import { Button, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import logo from "../../assets/GitHub-Mark.png";
import AddAppModal from "./AddAppModal";

const useStyles = makeStyles()((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
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
}));

export default function AddApps() {
  const { classes } = useStyles();

  const [modal, setModal] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

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
      <Typography
        color="textPrimary"
        fontWeight={"600"}
        gutterBottom
        sx={{
          fontSize: "24",
          display: "flex",
          alignItems: "left",
          paddingBottom: 5,
        }}
      >
        Application Catalogue
      </Typography>
      <Card className={classes.card} variant="outlined">
        <CardMedia
          component="img"
          height="150"
          image={logo}
          alt="github"
          sx={{ objectFit: "contain", width: 101 }}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            color="textPrimary"
            fontWeight={"600"}
            gutterBottom
            sx={{ fontSize: "24", marginRight: 30 }}
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
