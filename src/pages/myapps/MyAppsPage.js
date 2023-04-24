import React from 'react';
import MyApps from './MyApps';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { tableContainerStyles } from '../../assets/styles/tableContainer';
import UnauthorizedPage from '../UnauthorizedPage';
import { getAuthorizationForPage } from '../../helpers/AuthorizationHelper';
import SessionHelper from '../../helpers/SessionHelper';

export default function MyAppsPage() {
  const roles = SessionHelper.getUser().roles;
  const authorization = getAuthorizationForPage(roles, "myApps");
  
  return (
    <Container maxWidth={false} disableGutters style={tableContainerStyles}>
      <Grid>
        {authorization?.view ? <MyApps /> : <UnauthorizedPage/>}
      </Grid>
    </Container>
  );
}