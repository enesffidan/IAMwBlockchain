import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  FormControl,
  Typography,
} from "@material-ui/core";
import Request from "../../helpers/Request";
import TableEntryModal from "../../components/Modal/TableEntryModal";
import { TextArea } from "../../components/Fields/TextField";
import SessionHelper from "../../helpers/SessionHelper";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: "10px 1rem 0",
  },
  cancelButton: {
    margin: "10px 1rem 0",
    backgroundColor: "white",
    maxWidth: 200,
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
    fontSize: "24",
    display: "flex",
    alignItems: "left",
    paddingBottom: 5,
    fontWeight: "600",
  },
}));
export default function NewUserModal({ modal, setModal, modalLoading }) {
  const classes  = useStyles();
  const user = SessionHelper.getUser();
  const token = user.token;
  const [loading, setLoading] = React.useState(false);
  const [newUserProps, setNewUserProps] = React.useState({
    // firstName: null,
    // lastName: null,
    username: null,
    email: null,
    password: null,
  });

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
    if (reason && reason == "backdropClick") return;
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
          Add Person
        </Typography>
        {/* <TextArea //FIRST NAME
          label={"First Name"}
          value={newUserProps.firstName}
          onChangeFunc={(value) => {
            setNewUserProps({ ...newUserProps, firstName: value.target.value });
          }}
          style={classes.textField}
        />
        <TextArea //Last NAME
          label={"Last Name"}
          value={newUserProps.lastName}
          onChangeFunc={(value) => {
            setNewUserProps({ ...newUserProps, lastName: value.target.value });
          }}
          style={classes.textField}
        /> */}
        <TextArea //User NAME
          label={"User Name"}
          value={newUserProps.username}
          onChangeFunc={(value) => {
            setNewUserProps({ ...newUserProps, username: value.target.value });
          }}
          style={classes.textField}
        />
        <TextArea //EMAıl
          label={"Email"}
          value={newUserProps.email}
          onChangeFunc={(value) => {
            setNewUserProps({ ...newUserProps, email: value.target.value });
          }}
          style={classes.textField}
        />
        <TextArea //PASSWORD
          label={"Password"}
          value={newUserProps.password}
          onChangeFunc={(value) => {
            setNewUserProps({ ...newUserProps, password: value.target.value });
          }}
          style={classes.textField}
        />
        <div style={{ paddingBottom: 20, textAlign: "center" }}>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div className={classes.buttons}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() => handleCloseModal()}
                className={classes.submit}
                sx={{ backgroundColor: "white", maxWidth: 200 }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onButtonClick()}
                className={classes.submit}
                sx={{ color: "white", maxWidth: 200 }}
              >
                Add Person
              </Button>
            </div>
          )}
        </div>
      </FormControl>
    </TableEntryModal>
  );
}
