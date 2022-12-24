import React from 'react';
// import { IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import Settings from '../../Buttons/Settings';
import MenuItems from './MenuItems';
import { makeStyles } from 'tss-react/mui';


const drawerWidth = 300;

const useStyles = makeStyles()((theme) => ({
  drawer: {
    width: drawerWidth,
    maxWidth: drawerWidth + 20,
    flexShrink: 0,
  },
  drawerPaper: {
    color: '#000000',
    backgroundColor: '#FAF9FF',
    width: drawerWidth,
    maxWidth: drawerWidth + 20
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',//justifyContent: 'space-between',
  },
  drawerButtonIcon: {
    color: "#ffffff"
  },
  helpIcon: {
    color: "#ffffff",
  },
  options: {
    marginTop: 'auto',
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

/**
 * A component that renders the drawer sidebar navigation with buttons that link to the pages in the drawerList array.
 * This drawer also contains buttons to switch the language, switch dark/light mode, and close the drawer.
 * @param {open: boolean, drawerList: obj[], darkMode: boolean, setDarkMode: func, setLanguage: func, theme: obj, handleDrawerClose: func} param properties of the drawer component 
 */
export default function NavDrawer({ open, drawerList, darkMode, setDarkMode, setLanguage, theme, handleDrawerClose }) {
  const { classes } = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={true}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        {/* <IconButton onClick={() => window.open("help")}>
          <HelpOutlineIcon className={classes.helpIcon}/>
        </IconButton> */}
        {/* <IconButton onClick={handleDrawerClose} size="large">
          {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.drawerButtonIcon} /> : <ChevronRightIcon />}
        </IconButton> */}
      </div>
      <Divider />
      <List>
        <MenuItems drawerList={drawerList} />
      </List>
{/* 
      <div className={classes.options}>
        <Settings darkMode={darkMode} setDarkMode={setDarkMode} setLanguage={setLanguage} />
      </div> */}
    </Drawer>
  );
}