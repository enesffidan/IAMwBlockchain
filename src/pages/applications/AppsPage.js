import React from "react";
import Apps from "./Apps";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { tableContainerStyles } from "../../assets/styles/tableContainer";
import UnauthorizedPage from "../UnauthorizedPage";
import { getAuthorizationForPage } from "../../helpers/AuthorizationHelper";
import SessionHelper from "../../helpers/SessionHelper";

export default function PeoplePage() {
  const roles = SessionHelper.getUser().roles;
  const authorization = getAuthorizationForPage(roles, "apps");

  return (
    <Container maxWidth={false} disableGutters style={tableContainerStyles}>
      <Grid>{authorization?.view ? <Apps /> : <UnauthorizedPage />}</Grid>
    </Container>
  );
}
