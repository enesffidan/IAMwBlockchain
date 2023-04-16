import React from 'react';
import People from './People';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { tableContainerStyles } from '../../assets/styles/tableContainer';
import UnauthorizedPage from '../UnauthorizedPage';
import { getAuthorizationForPage } from '../../helpers/AuthorizationHelper';
import SessionHelper from '../../helpers/SessionHelper';

export default function PeoplePage() {
  const roles = SessionHelper.getUser().roles;
  const authorization = getAuthorizationForPage(roles, "people");
  
  return (
    <Container maxWidth={false} disableGutters style={tableContainerStyles}>
      <Grid>
        {authorization?.view ? <People /> : <UnauthorizedPage/>}
      </Grid>
    </Container>
  );
}