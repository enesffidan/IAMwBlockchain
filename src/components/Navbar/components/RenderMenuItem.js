import React from 'react';
import { styled } from '@mui/system';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from 'react-router-dom';

const useStyles = styled((theme) => ({
  listItemIcon: {
    color: "#ffffff"
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

/**
 * A component that renders the drawer sidebar navigation with buttons that link to the pages in the drawerList array.
 * This drawer also contains buttons to switch the language, switch dark/light mode, and close the drawer.
 * @param {open: boolean, drawerList: obj[], darkMode: boolean, setDarkMode: func, setLanguage: func, theme: obj, handleDrawerClose: func} param properties of the drawer component 
 */
export default function RenderMenuItem({ value, index, outer }) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = () => {
    history.push(value?.Path);
  }

  return (
    <ListItem button key={value?.label} onClick={onClick} className={!outer && classes.nested}>
      <ListItemIcon className={classes.listItemIcon} >
        {(index === 0 && outer) ? <HomeIcon /> : <ListIcon />}
      </ListItemIcon>
      <ListItemText primary={value?.label} />
    </ListItem>
  )
}