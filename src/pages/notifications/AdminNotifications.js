import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Table from "../../components/Table/Table";
import SessionHelper from "../../helpers/SessionHelper";
import Request from "../../helpers/Request";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const getNotifications = useCallback(async () => {
    const notificationsResponse = await Request("post", "/adminNotification", {
      username: user.username,
    });
    console.log(notificationsResponse);
    setRows(notificationsResponse.data);
  }, []);

  useEffect(() => {
    getNotifications();
  }, []);

  const confirmNotification = async (rowData) => {
    console.log(rowData);
    if (rowData.notificationType === 1) {
      const resp = await Request("post", "/notificationInteract", {
        confirm: true,
        targetUsername: rowData.targetUser,
        status: rowData.notificationType,
        appname: rowData.app,
        adminUsername: rowData.username,
        notification: rowData.notification,
      });
      history.push("/assign-apps-next", {
        appname: rowData.app,
        targetUsername: rowData.targetUser,
      });
    } else {
      const resp = await Request("post", "/notificationInteract", {
        confirm: true,
        targetUsername: rowData.targetUser,
        status: rowData.notificationType,
        appname: rowData.app,
        adminUsername: rowData.username,
        notification: rowData.notification,
      });
    }
  };

  const rejectNotification = async (rowData) => {
    console.log(rowData);
    const resp = await Request("post", "/notificationInteract", {
      confirm: false,
      targetUsername: rowData.targetUser,
      status: rowData.notificationType,
      appname: rowData.app,
      adminUsername: rowData.username,
      notification: rowData.notification,
    });
    console.log(resp);
  };

  const columns = [
    {
      title: "Notifications",
      field: "notification",
    },
    {
      title: "Date",
      field: "date",
    },
    {
      title: "Confirmation",
      field: "date",
      render: (rowData) => (
        <>
          <Button onClick={() => confirmNotification(rowData)}>
            <CheckCircleIcon />
          </Button>
          <Button onClick={() => rejectNotification(rowData)}>
            <CancelIcon />
          </Button>
        </>
      ),
    },
  ];

  const tableRef = React.useRef();
  const [rows, setRows] = React.useState([]);
  const [numOfEntries, setNumOfEntries] = React.useState(0);

  return (
    <React.Fragment>
      <div className={classes.root}>
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
