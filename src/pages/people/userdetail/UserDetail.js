import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import PersonAddAlt1Icon from "@material-ui/icons/PersonAdd";
import IconTooltipButton from "../../../components/Buttons/IconTooltipButton";
import AssignAppModal from "../AssignAppModal";
import Table from "../../../components/Table/Table";
import Request from "../../../helpers/Request";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
  const classes = useStyles();
  const location = useLocation();
  const username = location.pathname.substring(6);
  const columns = [
    {
      field: "id",
      title: "ID",
    },
    {
      title: "Application",
      field: "appname",
    },
  ];

  const tableRef = React.useRef();
  const [rows, setRows] = React.useState([]);
  const [numOfEntries, setNumOfEntries] = React.useState(0);

  const [modal, setModal] = React.useState(false);
  const [modalLoading, setModalLoading] = React.useState(false);

  const getUserApps = useCallback(async () => {
    const resp = await Request("post", "/userAppsAdmin", {
      username: username,
    });
    console.log(resp);
    setRows(resp.data.apps);
  }, []);

  useEffect(() => {
    getUserApps();
  }, []);

  const handleOpenModal = () => {
    setModalLoading(true);
    setModal(true);
    setModalLoading(false);
  };

  return (
    <React.Fragment>
      <AssignAppModal
        modal={modal}
        setModal={setModal}
        modalLoading={modalLoading}
        username={username}
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
