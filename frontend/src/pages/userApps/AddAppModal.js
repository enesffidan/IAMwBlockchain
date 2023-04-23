import React, { useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import {
  Button,
  CircularProgress,
  FormControl,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TableEntryModal from "../../components/Modal/TableEntryModal";

const useStyles = makeStyles()((theme) => ({
  submit: {
    margin: "10px 1rem 0",
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
}));

export default function AddAppModal({ modal, setModal, modalLoading }) {
  const { classes } = useStyles();

  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
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
          Request Access to App
        </Typography>
        <Typography
          color="textPrimary"
          gutterBottom
          sx={{
            fontSize: "20",
            display: "flex",
            alignItems: "left",
            paddingBottom: 5,
          }}
        >
          Send request to your admin with app you would like to access. Choose
          your configuration:
        </Typography>

        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="I have an account" />
          <FormControlLabel value="male" control={<Radio />} label="Let admin decide my username and password" />
        </RadioGroup>
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
                SEND REQUEST
              </Button>
            </div>
          )}
        </div>
      </FormControl>
    </TableEntryModal>
  );
}
