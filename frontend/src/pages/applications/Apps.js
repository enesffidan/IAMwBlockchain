import React from "react";
import { makeStyles } from "tss-react/mui";
import { Typography } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import IconTooltipButton from "../../components/Buttons/IconTooltipButton";
import Table from "../../components/Table/Table";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // overflowY: "auto",
    // maxHeight: "700px",
    // margin: "0 auto",
    // textAlign: "left",
    padding: 10,
    // marginBottom: 10,
    border: "solid",
    borderWidth: "thin",
    borderRadius: "10px",
  },
  typo: {
    fontWeight: "bold",
  },
  button: {
    // paddingBottom: 10,
  },
  editButton: {
    // paddingBottom: 10,
    width: 10,
  },
}));

export default function Apps() {
  const { classes } = useStyles();
  const history = useHistory();
  const columns = [
    {
      title: "Application",
      field: "name",
    },
    {
      title: "Configuration",
      field: "id",
      render: (rowData) => (
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => window.open("/app/" + rowData.id)}
          className={classes.editButton}
        >
          Edit
        </Button>
      ),
    },
  ];

  const tableRef = React.useRef();
  const [rows, setRows] = React.useState([{ name: "Facebook", id: "1" }]);
  const [numOfEntries, setNumOfEntries] = React.useState(0);

  return (
    <React.Fragment>
      {/* <NewUserModal
        modal={modal}
        setModal={setModal}
        modalLoading={modalLoading}
      /> */}
      <div className={classes.root}>
        {/* <Typography className={classes.typo} variant="h5" gutterBottom>
          People
        </Typography> */}

        <Table
          noRowActions
          data={rows}
          tableRef={tableRef}
          columns={columns}
          authName="apps"
          numOfEntries={numOfEntries}
          setNumOfEntries={setNumOfEntries}
          tableName={"Applications"}
          headerComponents={
            <div className={classes.button}>
              <IconTooltipButton
                label={"Assign Users to App"}
                onClick={() => history.push("/assign-apps/")}
              >
                <PersonAddAlt1Icon />
              </IconTooltipButton>
            </div>
          }
        />
      </div>
    </React.Fragment>
  );
}
