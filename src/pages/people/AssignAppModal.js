import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  FormControl,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/Card";
import { CardMedia } from "@material-ui/core";
import { CardActionArea } from "@material-ui/core";
import Request from "../../helpers/Request";
import TableEntryModal from "../../components/Modal/TableEntryModal";
import fblogo from "../../assets/Facebook_Logo_(2019).png";
import linkedinLogo from "../../assets/LinkedIn_logo.png";
import logo from "../../assets/GitHub-Mark.png";
import SessionHelper from "../../helpers/SessionHelper";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: "10px 1rem 0",
    width: "20%",
    height: 50,
  },
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5
  },
  cancelButton: {
    margin: "10px 1rem 0",
    backgroundColor: "white",
    maxWidth: 200,
  },
  cardMedia: {
    objectFit: "contain",
    padding: 5,
    width: 101,
  },
  cardContent: {
    position: "absolute",
    width: 150,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 10,
    right: 150,
    top: 50,
  },
  saveButton: {
    margin: "10px 1rem 0",
    color: "white",
    maxWidth: 200,
  },
  formControl: {
    width: "70vw",
    maxWidth: 600,
    maxHeight: "42vw",
  },
  textField: {
    marginBottom: "2vw",
    whiteSpace: "pre-wrap",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  typo: {
    position: "relative",
    alignItems: "center",
    fontSize: "50",
    display: "flex",
    fontWeight: "600",
    left: -120,
  },
}));
export default function AssignAppModal({ modal, setModal, modalLoading }) {
  const classes = useStyles();
  const user = SessionHelper.getUser();
  const token = user.token;
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [newUserProps, setNewUserProps] = React.useState({
    // firstName: null,
    // lastName: null,
    userName: null,
    email: null,
    password: null,
  });
  const getApps = useCallback(async () => {
    const resp = await Request("get", "/requestAppDisplay");
    console.log("asdas", resp);
    setApps(resp.data);
  }, []);

  useEffect(() => {
    getApps();
  }, []);

  const init = useCallback(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    init();
  }, [init]);

  const onButtonClick = () => {
    handleRequest(
      newUserProps.username,
      // newUserProps.firstName,
      // newUserProps.lastName,
      newUserProps.password,
      newUserProps.email,
      token
    );
  };

  async function handleRequest(
    username,
    // firstName,
    // lastName,
    password,
    email,
    token
  ) {
    setLoading(true);
    const resp = await Request("post", "/addPerson", {
      username: username,
      // firstName: firstName,
      // lastName: lastName,
      password: password,
      email: email,
      token: token,
    });
    console.log(resp);
    handleCloseModal();
    setLoading(false);
  }

  const handleCloseModal = (event, reason) => {
    setModal(false);
  };

  return (
    <TableEntryModal
      modal={modal}
      handleCloseModal={handleCloseModal}
      modalLoading={modalLoading}
    >
      <FormControl required autoComplete="off" className={classes.formControl}>
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
          Assign Application
        </Typography>
        {apps.map((app) => {
          return (
            <Card className={classes.root} variant="outlined">
              <CardMedia
                component="img"
                height="150"
                image={
                  app.appname == "Github"
                    ? logo
                    : app.appname == "Facebook"
                    ? fblogo
                    : linkedinLogo
                }
                alt="github"
                className={classes.cardMedia}
              />
              <Typography
                color="textPrimary"
                className={classes.typo}
                gutterBottom
              >
                {app.appname}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onButtonClick()}
                className={classes.submit}
              >
                Assign
              </Button>
            </Card>
          );
        })}

        <div style={{ paddingBottom: 20, textAlign: "center" }}>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div className={classes.buttons}>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onButtonClick()}
                className={classes.submit}
                sx={{ color: "white", maxWidth: 200 }}
              >
                Done
              </Button>
            </div>
          )}
        </div>
      </FormControl>
    </TableEntryModal>
  );
}
