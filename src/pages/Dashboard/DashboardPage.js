import React from 'react';
import Dashboard from './Dashboard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { tableContainerStyles } from '../../assets/styles/tableContainer';
import UnauthorizedPage from '../UnauthorizedPage';
import { getAuthorizationForPage } from '../../helpers/AuthorizationHelper';
import SessionHelper from '../../helpers/SessionHelper';

export default function DashboardPage() {
  const roles = SessionHelper.getUser().roles;
  const authorization = getAuthorizationForPage(roles, "dashboard");
  
  return (
    <Container maxWidth={false} disableGutters style={tableContainerStyles}>
      <Grid>
        {authorization?.view ? <Dashboard /> : <UnauthorizedPage/>}
      </Grid>
    </Container>
  );
}