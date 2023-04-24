import React from "react";
import { makeStyles } from "tss-react/mui";
import { Typography } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import IconTooltipButton from "../../../components/Buttons/IconTooltipButton";
import NewUserModal from "../NewUserModal";
import Table from "../../../components/Table/Table";

const useStyles = makeStyles()((theme) => ({
  root: {
    // display: "flex",
    // flexDirection: "column",
    // overflowY: "auto",
    // maxHeight: "700px",
    // margin: "0 auto",
    textAlign: "left",
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
}));

export default function UserDetail() {
  const { classes } = useStyles();
  const columns = [
    {
      title: "Application",
      field: "app",
    },
    {
      field: "username",
      title: "App Username",
    },
  ];

  const tableRef = React.useRef();
  const [rows, setRows] = React.useState([
    { app: "Facebook", username: "test", id: "1" },
  ]);
  const [numOfEntries, setNumOfEntries] = React.useState(0);

  const [modal, setModal] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

  const handleOpenModal = () => {
    setModalLoading(true);
    setModal(true);
    setModalLoading(false);
  };

  return (
    <React.Fragment>
      <NewUserModal
        modal={modal}
        setModal={setModal}
        modalLoading={modalLoading}
      />
      <div className={classes.root}>
        <Typography className={classes.typo} variant="h5" gutterBottom>
          Onur Cihangir
        </Typography>
        <Typography className={classes.typo} variant="h5" gutterBottom>
          onurcihangir@email.com
        </Typography>

        <Table
          noRowActions
          data={rows}
          tableRef={tableRef}
          columns={columns}
          authName="people"
          numOfEntries={numOfEntries}
          setNumOfEntries={setNumOfEntries}
          tableName={"Assigned Applications"}
          headerComponents={
            <div className={classes.button}>
              <IconTooltipButton
                label={"Assign Applications"}
                onClick={handleOpenModal}
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
