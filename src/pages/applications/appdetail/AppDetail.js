import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // overflowY: "auto",
    // maxHeight: "700px",
    // margin: "0 auto",
    textAlign: "left",
    paddingTop: 100,
    paddingLeft: 250,
    // marginBottom: 10,
    // border: "solid",
    // borderWidth: "thin",
    // borderRadius: "10px",
  },
  settings: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    textAlign: "left",
    padding: 10,
    marginBottom: 10,
    border: "solid",
    borderWidth: "thin",
    borderRadius: "10px",
    maxWidth: 800,
  },
  typo: {
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    margin: "0 1rem 0",
    color: "white",
    maxWidth: 150,
  },
}));

export default function AppDetail() {
  const classes = useStyles();

  const [value, setValue] = React.useState("user");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Typography className={classes.typo} variant="h4" gutterBottom>
          Facebook
        </Typography>
        <div className={classes.settings}>
          <Typography className={classes.typo} variant="h6" gutterBottom>
            Settings
          </Typography>
          <FormControl className={{ paddingLeft: 2 }}>
            <FormLabel
              className={{ paddingBottom: 1, fontWeight: "bold" }}
              focused={false}
            >
              Sign-on Methods
            </FormLabel>
            <RadioGroup value={value} onChange={handleChange}>
              <FormControlLabel
                value="user"
                control={<Radio />}
                label="User sets username and password"
              />
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin sets username and password"
              />
            </RadioGroup>
          </FormControl>
          <div className={classes.buttons}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // onClick={() => onButtonClick()}
              className={classes.submit}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
