import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Grid,
} from "@material-ui/core";
import clsx from 'clsx'
import MenuIcon from "@material-ui/icons/Menu";
import LanguageHelper from "../../../helpers/LanguageHelper";
import SessionHelper from "../../../helpers/SessionHelper";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    fontFamily: theme.typography.fontFamily.Helvetica,
    backgroundColor: "#E3F3FA",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    zIndex: theme.zIndex.drawer,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: theme.zIndex.drawer,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  titleTypography: {
    textDecoration: "none",
    color: "#000000",
  },
  avatar: {
    margin: "0 auto",
    width: 120,
    height: "auto",
  },
  logoutButton: {
    border: "1px solid gray",
    width: "90px",
    margin: "0 auto",
  },
}));

/**
 * A component that renders the top navigation bar with a drawer and logout button.
 * @param {open: boolean, handleDrawerOpen: func, logout: func} param properties of the topbar component
 */
export default function TopBar({ open, handleDrawerOpen, logout }) {
  const classes = useStyles();
  const language = LanguageHelper.getLanguage();
  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          // onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
          size="large"
        >
          <MenuIcon />
        </IconButton>
        <Grid className={classes.title}>
          <img className={classes.avatar} alt=""/>
        </Grid>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            className={classes.titleTypography}
            variant="subtitle2"
            noWrap
          >
            {SessionHelper.getUser().firstName +
              " " +
              SessionHelper.getUser().lastName}
          </Typography>
          <Button
            onClick={logout}
            color="inherit"
            size="small"
            className={classes.logoutButton}
          >
            {language.navbar.logout}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
