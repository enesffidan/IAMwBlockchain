import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import PersonAddAlt1Icon from "@material-ui/icons/PersonAdd";
import CheckIcon from "@material-ui/icons/Check";
import Table from "../../components/Table/Table";
import Button from "@material-ui/core/Button";
import SessionHelper from "../../helpers/SessionHelper";
import Request from "../../helpers/Request";

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
  editButton: {
    // paddingBottom: 10,
    width: 10,
  },
}));

export default function AdminNotifications() {
  const classes = useStyles();
  const user = SessionHelper.getUser();
  const getNotifications = useCallback(async () => {
    const notificationsResponse = await Request("post", "/adminNotification", {
      username: user.username,
    });
    console.log(notificationsResponse)
    setRows(notificationsResponse);
  }, []);

  useEffect(() => {
    getNotifications();
  }, []);

  const columns = [
    {
      title: "Notifications",
      field: "appname",
    },
    {
      title: "Date",
      field: "id",
    },
    {
      title: "Confirmation",
      field: "id",
      render: () => (
        <div onClick={() => getNotifications()}>
          <CheckIcon />
        </div>
      ),
    },
  ];

  const tableRef = React.useRef();
  const [rows, setRows] = React.useState([]);
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
          tableName={"Notifications"}
        />
      </div>
    </React.Fragment>
  );
}
