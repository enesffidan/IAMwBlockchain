import React from 'react';
import RenderMenuItem from './RenderMenuItem';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  listItemIcon: {
    color: "#ffffff"
  },
  nestedDropdown: {
    paddingLeft: theme.spacing(2),
  },
}));

/**
 * A component that renders the drawer sidebar navigation with buttons that link to the pages in the drawerList array.
 * This drawer also contains buttons to switch the language, switch dark/light mode, and close the drawer.
 * @param {open: boolean, drawerList: obj[], darkMode: boolean, setDarkMode: func, setLanguage: func, theme: obj, handleDrawerClose: func} param properties of the drawer component 
 */
export default function RenderDropdownMenuItem({ value, index, outer }) {
  const { classes } = useStyles();

  const [state, setState] = React.useState(false);

  const handleClick = (text) => {
    text.open = !text.open;
    setState(!state);
  };

  return (
    <div key={index} className={!outer && classes.nestedDropdown}>
      <ListItem button key={value.label} onClick={() => handleClick(value)}>
        <ListItemIcon className={classes.listItemIcon}>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary={value.label} />
        {value.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={value.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {value.values.map((value, index) => value !== false && (
              value.values ? (
                <RenderDropdownMenuItem value={value} index={index} />
              ) : (
                value.label && (
                  <RenderMenuItem value={value} index={index} />
                )
              )
            )
          )}
        </List>
      </Collapse>
    </div>
  );
}