import React, { useCallback } from "react";
import { makeStyles } from "tss-react/mui";
import { Typography } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import IconTooltipButton from "../../components/Buttons/IconTooltipButton";
import NewUserModal from "./NewUserModal";
import Table from "../../components/Table/Table";
import Request from "../../helpers/Request";
import { useEffect } from "react";

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
}));

export default function People() {
  const { classes } = useStyles();
  const columns = [
    {
      title: "Person",
      field: "username",
    },
    {
      title: "Username",
      field: "username",
    },
    {
      title: "Status",
      field: "apps",
    },
  ];

  const tableRef = React.useRef();
  const [rows, setRows] = React.useState([
    { name: "Onur Cihangir", email: "asdasd", status: "active", id: "1" },
  ]);
  const [numOfEntries, setNumOfEntries] = React.useState(0);

  const [modal, setModal] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

  const getUsers = useCallback(async () => {
    const users = await Request("get", "/fetchUsers");
    setRows(users.data);
    console.log("asd", users);
  }, []);
  useEffect(() => getUsers(), []);
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
        {/* <Typography className={classes.typo} variant="h5" gutterBottom>
          People
        </Typography> */}

        <Table
          data={rows}
          tableRef={tableRef}
          columns={columns}
          authName="people"
          numOfEntries={numOfEntries}
          setNumOfEntries={setNumOfEntries}
          tableName={"People"}
          detailsWindow={(rowData) => window.open("/user/" + rowData.id)}
          headerComponents={
            <div className={classes.button}>
              <IconTooltipButton label={"Add Person"} onClick={handleOpenModal}>
                <PersonAddAlt1Icon />
              </IconTooltipButton>
            </div>
          }
        />
      </div>
    </React.Fragment>
  );
}
