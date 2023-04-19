import React from "react";
import { makeStyles } from "tss-react/mui";
import { Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

const useStyles = makeStyles()((theme) => ({
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
  },
}));

export default function AppDetail() {
  const { classes } = useStyles();

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
          <FormControl sx={{ paddingLeft: 2 }}>
            <FormLabel
              sx={{ paddingBottom: 1, fontWeight: "bold" }}
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
              sx={{ color: "white", maxWidth: 150 }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
