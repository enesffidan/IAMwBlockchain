import React from "react";
import { makeStyles } from "tss-react/mui";
import AltTable from "../../components/Table/AltTable";
import { Typography } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import IconTooltipButton from "../../components/Buttons/IconTooltipButton";
import NewUserModal from "./NewUserModal";

const useStyles = makeStyles()((theme) => ({
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
  formControl: {
    width: "100%",
  },
  dateField: {
    marginBottom: "2vw",
    marginTop: 0,
  },
  textField: {
    width: "90%",
    margin: 10,
  },
  dropzone: {
    height: "100%",
    width: "18vw",
  },
  typo: {
    fontWeight: "bold",
  },
  button: {
    paddingBottom: 10,
  },
}));

export default function People() {
  const { classes } = useStyles();

  const titles = ["Person", "Email", "Status"];
  const [rows, setRows] = React.useState([
    ["Onur Cihangir", "asdasd", "active"],
  ]);

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
          People
        </Typography>
        <div className={classes.button}>
          <IconTooltipButton label={"Add Person"} onClick={handleOpenModal}>
            <PersonAddAlt1Icon />
          </IconTooltipButton>
        </div>
        <AltTable titles={titles} rows={rows} />
      </div>
    </React.Fragment>
  );
}
