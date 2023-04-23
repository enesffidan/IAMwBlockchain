import React from "react";
import { makeStyles } from "tss-react/mui";
import { CircularProgress, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { modalStyles } from "../../assets/styles/tableContainer";

const useStyles = makeStyles()((theme) => modalStyles(theme));

/**
 * Modal component used in tables for adding/editing entries.
 * @param {modal: boolean, handleCloseModal: func, modalLoading: boolean, children: obj} props of the table entry modal
 */
export default function TableEntryModal({
  modal,
  handleCloseModal,
  modalLoading,
  children,
}) {
  const { classes } = useStyles();

  return (
    <React.Fragment>
      <Modal
        className={classes.modal}
        open={modal}
        onClose={handleCloseModal}
        closeAfterTransition
        // BACKDROP ÇALIŞMIYOR
        // slots={{ backdrop: Backdrop }}
        // slotProps={{
        //   backdrop: {
        //     timeout: 500,
        //   },
        // }}
        // BackdropComponent={Backdrop}
        // BackdropProps={{
        //   timeout: 500,
        // }}
      >
        <Fade in={modal}>
          <div className={classes.paper}>
            {modalLoading ? (
              <CircularProgress color="secondary" />
            ) : (
              <div>{children}</div>
            )}
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
