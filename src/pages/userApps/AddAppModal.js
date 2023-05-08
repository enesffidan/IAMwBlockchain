import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CircularProgress,
  FormControl,
  Typography,
} from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TableEntryModal from "../../components/Modal/TableEntryModal";
import { TextArea } from "../../components/Fields/TextField";
import Request from "../../helpers/Request";

const useStyles = makeStyles((theme) => ({
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
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  header: {
    fontSize: "24",
    display: "flex",
    alignItems: "left",
    paddingBottom: 5,
    fontWeight: "600",
  },
  typo: {
    fontSize: "20",
    display: "flex",
    alignItems: "left",
    paddingBottom: 5,
  },
  textField: {
    marginTop: 5,
    whiteSpace: "pre-wrap",
  },
}));

export default function AddAppModal({
  modal,
  setModal,
  modalLoading,
  selectedApp,
}) {
  const classes = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("female");
  const [haveAnAccount, setHaveAnAccount] = React.useState(true);
  const [accountProps, setAccountProps] = React.useState({});

  const handleChange = (event) => {
    setValue(event.target.value);
    setHaveAnAccount(!haveAnAccount);
  };

  const init = useCallback(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    init();
  }, [init]);

  const onButtonClick = () => {
    handleRequest();
  };

  const handleRequest = async () => {
    setLoading(true);
    if (haveAnAccount) {
      const props = {
        ...accountProps,
        haveAnAccount: true,
        appId: selectedApp,
      };
      const resp = await Request("post", "/addAppUser", props);
      console.log(resp);
    } else {
      const props = {
        ...accountProps,
        haveAnAccount: false,
        appId: selectedApp,
      };
      const resp = await Request("post", "/addAppUser", props);
      console.log('asdas',resp);
    }
    handleCloseModal();
    setLoading(false);
  };

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
        <Typography color="textPrimary" gutterBottom className={classes.header}>
          Request Access to App
        </Typography>
        <Typography color="textPrimary" gutterBottom className={classes.typo}>
          Send request to your admin with app you would like to access. Choose
          your configuration:
        </Typography>

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="I have an account"
          />
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Let admin decide my username and password"
          />
        </RadioGroup>
        {haveAnAccount && (
          <TextArea //User NAME
            label={"User Name"}
            value={accountProps.userName}
            onChangeFunc={(value) => {
              setAccountProps({
                ...accountProps,
                userName: value.target.value,
              });
            }}
            style={classes.textField}
          />
        )}
        {haveAnAccount && (
          <TextArea //PASSWORD
            label={"Password"}
            value={accountProps.password}
            onChangeFunc={(value) => {
              setAccountProps({
                ...accountProps,
                password: value.target.value,
              });
            }}
            style={classes.textField}
          />
        )}
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
                className={classes.cancelButton}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onButtonClick()}
                className={classes.saveButton}
              >
                SEND REQUEST
              </Button>
            </div>
          )}
        </div>
      </FormControl>
    </TableEntryModal>
  );
}
