import React from "react";
import { makeStyles } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    maxHeight: "700px",
    margin: "0 auto",
    textAlign: "left",
    padding: 10,
    marginBottom: 10,
    border: "solid",
    borderWidth: "thin",
    borderRadius: "10px",
  },
  typo: {
    fontWeight: "bold",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  submit: {
    margin: "10px 1rem 0",
  },
}));

export default function AssignApps() {
  const { classes } = useStyles();
  const history = useHistory();

  const [apps, setApps] = React.useState([{ name: "Facebook", id: "1" }]);
  const [selectedApps, setSelectedApps] = React.useState([]);

  const [users, setUsers] = React.useState([
    { name: "Onur Cihangir", id: "1" },
  ]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);

  const handleAppSelect = (event) => {
    // create copy of array
    let temp = [...selectedApps];
    // find index of selected app
    const index = temp.indexOf(event.target.id);
    // if it is already selected
    if (index !== -1) {
      // remove selected app's id from array
      temp.splice(index, 1);
    } else {
      // if it is not selected, add its id to array
      temp.push(event.target.id);
    }
    setSelectedApps(temp);
  };

  const handleUserSelect = (event) => {
    // create copy of array
    let temp = [...selectedUsers];
    // find index of selected user
    const index = temp.indexOf(event.target.id);
    // if it is already selected
    if (index !== -1) {
      // remove selected user's id from array
      temp.splice(index, 1);
    } else {
      // if it is not selected, add its id to array
      temp.push(event.target.id);
    }
    setSelectedUsers(temp);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.typo} variant="h5" gutterBottom>
        Assign Applications
      </Typography>

      <Grid
        container
        spacing={6}
        className={classes.gridContainer}
        justify="center"
      >
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#D9D9D9",
              border: "solid",
              borderWidth: "2px",
              borderRadius: 5,
              width: 359,
            }}
          >
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel
                component="legend"
                focused={false}
                sx={{ paddingBottom: 1, fontWeight: "bold" }}
              >
                Application
              </FormLabel>
              <Divider
                color="black"
                sx={{ height: 1, width: 356, marginLeft: -3 }}
              />
              <FormGroup>
                {apps.map((app) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          // checked={}
                          onChange={handleAppSelect}
                          id={app.id}
                        />
                      }
                      label={app.name}
                    />
                    <Divider
                      color="black"
                      sx={{ height: 1, width: 356, marginLeft: -3 }}
                    />
                  </>
                ))}
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#D9D9D9",
              border: "solid",
              borderWidth: "2px",
              borderRadius: 5,
              width: 359,
            }}
          >
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel
                component="legend"
                focused={false}
                sx={{ paddingBottom: 1, fontWeight: "bold" }}
              >
                People
              </FormLabel>
              <Divider
                color="black"
                sx={{ height: 1, width: 356, marginLeft: -3 }}
              />
              <FormGroup>
                {users.map((user) => (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox onChange={handleUserSelect} id={user.id} />
                      }
                      label={user.name}
                    />
                    <Divider
                      color="black"
                      sx={{ height: 1, width: 356, marginLeft: -3 }}
                    />
                  </>
                ))}
              </FormGroup>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => history.push("/apps")}
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
          // onClick={() => onButtonClick()}
          className={classes.submit}
          sx={{ color: "white", maxWidth: 200 }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
