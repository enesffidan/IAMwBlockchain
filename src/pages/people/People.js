import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonAddAlt1Icon from "@material-ui/icons/PersonAdd";
import IconTooltipButton from "../../components/Buttons/IconTooltipButton";
import NewUserModal from "./NewUserModal";
import Table from "../../components/Table/Table";
import Request from "../../helpers/Request";
import { useEffect } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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
  list: {
    height: 100,
    overflow: 'auto'
  }
}));

export default function People() {
  const classes = useStyles();
  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Username",
      field: "username",
    },
    {
      title: "Assigned Apps",
      field: "apps",
      render: (rowData) => (
        <List className={classes.list}>
          {rowData.apps.map((app) => {
            return (
              <ListItem>
                <ListItemText secondary={app} />
              </ListItem>
            );
          })}
        </List>
      ),
    },
    {
      title: "Role",
      field: "role",
    },
  ];

  const tableRef = React.useRef();
  const [rows, setRows] = React.useState([{ apps: [] }]);
  const [numOfEntries, setNumOfEntries] = React.useState(0);

  const [modal, setModal] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

  const getUsers = useCallback(async () => {
    const users = await Request("get", "/fetchUsers");
    console.log(users);
    setRows(users.data.users);
  }, []);
  useEffect(() => {
    getUsers();
  }, [getUsers]);
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
          detailsWindow={(rowData) => window.open("/user/" + rowData.username)}
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
