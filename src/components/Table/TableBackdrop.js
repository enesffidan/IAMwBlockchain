import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  addButton: {
    marginLeft: "12px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 2,
    color: "#fff",
  },
}));

export default function TableBackdrop({ backdropLoading }) {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={backdropLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
