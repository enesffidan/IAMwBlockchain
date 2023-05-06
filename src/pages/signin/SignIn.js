import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import LanguageHelper from "../../helpers/LanguageHelper";
import SessionHelper from "../../helpers/SessionHelper";
import Request from "../../helpers/Request";
// import CustomSnackbar from "../../components/Snackbar/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "150px",
    height: "460px",
    width: "384px",
    borderRadius: "30px",
    display: "flex",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  div: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 20,
    width: 300,
    height: "auto",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    color: "#fff",
    width: "156px",
    height: "50px",
  },
  buttonContainer: {
    marginTop: 10,
    textAlign: "center",
    paddingBottom: 20,
    paddingRight: 10,
    display: "flex",
    justifyContent: "flex-end",
  },
  textField: {
    width: "365px",
    borderRadius: "5px",
    background: "#D9D9D9",
  },
  forgot: {
    width: "128px",
    height: "16px",
    fontSize: "16px",
    marginLeft: "15px",
    display: "flex",
    justifyContent: "flex-start",
    color: "#000000",
  },
}));

export default function SignIn({ update, setUpdate }) {
  const history = useHistory();
  const classes = useStyles();
  const language = LanguageHelper.getLanguage();
  // const regexRules =
  //   /(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*\d)(?=.*[!@#$%&*'(),\-+<=>:;?{}^._])[A-Za-z\d!@#$%&*'(),\-+<=>:;?{}^._]{8,32}$/;

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [severity, setSeverity] = useState("info");
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = React.useState(false);

  async function handleLogin(username, password) {
    setLoading(true);
    const resp = await Request("post", "/login", {
      username: username,
      password: password,
    });
    console.log(resp);
    console.log([resp.data.role]);
    if (resp.data.login_status === true) {
      SessionHelper.setUser({
        firstName: username,
        lastName: "", // burası baska biyerden düzeltilcek gibi
        roles: [resp.data.role],
        token: resp.data.token,
      });

      SessionHelper.getUser();
      console.log(SessionHelper.getUser());

      setUpdate(!update);
      //     if (!regexRules.test(password)) {
      //       history?.location?.state
      //         ? history.push(history?.location?.state?.from?.pathname)
      //         : history.push("/dashboard", { error: true });
      //     } else {
      //       history?.location?.state
      //         ? history.push(history?.location?.state?.from?.pathname)
      history.push("/");
      //     }
      //   } else {
      //     console.log(data.key);
      //     history.push("/verification", {
      //       password: password,
      //       username: username,
      //       key: data.key,
      //       message: resp.data.messageResponse.message,
      //     });
      //   }
      // } else {
      //   if (resp?.status === 429) {
      //     setSeverity("error");
      //     setSnackbarMessage(
      //       "Çok fazla istekte bulundunuz. Lütfen daha sonra tekrar deneyiniz."
      //     );
      //     setSnackbar(true);
      //   } else {
      //     if (resp?.data && resp?.data.messageResponse) {
      //       setSeverity("error");
      //       setSnackbarMessage(resp.data.messageResponse.message);
      //       setSnackbar(true);
      //     } else {
      //       setSeverity("error");
      //       setSnackbarMessage(language.login.unexpectedError);
      //       setSnackbar(true);
      //     }
      //   }
    }
    setLoading(false);
  }

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(username, password);
    }
  };

  return (
    <Container maxWidth={false}>
      {/* <CustomSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        snackbarMessage={snackbarMessage}
        severity={severity}
      />*/}
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <CssBaseline />
          <div onKeyDown={_handleKeyDown} className={classes.div}>
            <Typography
              component="h1"
              variant="h5"
              // sx={{ width: "79px", height: "16px", fontSize: "32px" }}
            >
              {language.login.title}
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                error={snackbar}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={language.login.email}
                autoFocus
                onChange={(username) =>
                  setUsername(username.target.value.trim())
                }
                className={classes.textField}
              />
              <TextField
                error={snackbar}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={language.login.password}
                type="password"
                onChange={(password) => setPassword(password.target.value)}
                className={classes.textField}
              />
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      history.push("/forgot");
                    }}
                    className={classes.forgot}
                  >
                    {language.login.forgot}
                  </Link>
                </Grid>
              </Grid>
              <div className={classes.buttonContainer}>
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => handleLogin(username, password)}
                  >
                    {language.login.signin}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </Paper>
      </Container>
    </Container>
  );
}
