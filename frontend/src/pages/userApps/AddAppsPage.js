import React from 'react';
import AddApps from './components/AddApps';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { tableContainerStyles } from '../../assets/styles/tableContainer';
import UnauthorizedPage from '../UnauthorizedPage';
import { getAuthorizationForPage } from '../../helpers/AuthorizationHelper';
import SessionHelper from '../../helpers/SessionHelper';

export default function AddAppsPage() {
  const roles = SessionHelper.getUser().roles;
  const authorization = getAuthorizationForPage(roles, "addApps");
  
  return (
    <Container maxWidth={false} disableGutters style={tableContainerStyles}>
      <Grid>
        {authorization?.view ? <AddApps /> : <UnauthorizedPage/>}
      </Grid>
    </Container>
  );
}