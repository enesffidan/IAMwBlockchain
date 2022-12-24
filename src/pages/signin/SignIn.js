import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import Container from "@mui/material/Container";
import { useHistory } from "react-router-dom";
import LanguageHelper from "../../helpers/LanguageHelper";
// import SessionHelper from "../../helpers/SessionHelper";
import Request from "../../helpers/Request";
// import CustomSnackbar from "../../components/Snackbar/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

const useStyles = makeStyles()((theme) => ({
  paper: {
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
  },
  buttonContainer: {
    marginTop: 10,
    textAlign: "center",
    paddingBottom: 20,
  },
}));

export default function SignIn({ update, setUpdate }) {
  const history = useHistory();
  const { classes } = useStyles();
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
    // if (resp?.status === 200) {
    //   let data = resp.data.content;
    //   if (data.isLoggedIn == true) {
    //     SessionHelper.setUser(data.jwt);
    //     setUpdate(!update);
    //     if (!regexRules.test(password)) {
    //       history?.location?.state
    //         ? history.push(history?.location?.state?.from?.pathname)
    //         : history.push("/dashboard", { error: true });
    //     } else {
    //       history?.location?.state
    //         ? history.push(history?.location?.state?.from?.pathname)
    //         : history.push("/dashboard");
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
    // }
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
        <Paper
          sx={{
            marginTop: "150px",
            height: "460px",
            width: "384px",
            borderRadius: "30px",
            display: "flex",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <CssBaseline />
          <div onKeyDown={_handleKeyDown} className={classes.paper}>
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
                sx={{
                  width: "365px",
                  borderRadius: "5px",
                  background: "#D9D9D9",
                  // MuiFormControl: {
                  //   styleOverrides: {
                  //     root: {
                  //       background: "#528CFC",
                  //       width: "365px",
                  //       height: "63px",
                  //     },
                  //   },
                  // },
                }}
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
                sx={{
                  width: "365px",
                  borderRadius: "5px",
                  background: "#D9D9D9",
                }}
              />
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      history.push("/forgot");
                    }}
                    sx={[
                      {
                        width: "128px",
                        height: "16px",
                        fontSize: "16px",
                        marginLeft: "15px",
                        display: "flex",
                        justifyContent: "flex-start",

                        color: "#000000",
                      },
                      // Güzel bir Kullanım
                      // (theme) => ({
                      //   "&:hover": {
                      //     color: theme.palette.primary.main,
                      //   },
                      // }),
                    ]}
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
                    sx={{
                      color: "#fff",
                      width: "156px",
                      height: "50px",
                    }}
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
