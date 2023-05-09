import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { tableContainerStyles } from '../../assets/styles/tableContainer';
import UnauthorizedPage from '../UnauthorizedPage';
import { getAuthorizationForPage } from '../../helpers/AuthorizationHelper';
import SessionHelper from '../../helpers/SessionHelper';
import AdminNotifications from './AdminNotifications';

export default function AdminNotifications() {
  const roles = SessionHelper.getUser().roles;
  const authorization = getAuthorizationForPage(roles, "adminNotifications");
  
  return (
    <Container maxWidth={false} disableGutters style={tableContainerStyles}>
      <Grid>
        {authorization?.view ? <AdminNotifications /> : <UnauthorizedPage/>}
      </Grid>
    </Container>
  );
}