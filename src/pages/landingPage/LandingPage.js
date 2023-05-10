import React, { useEffect } from "react";
import SessionHelper from "../../helpers/SessionHelper";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  const user = SessionHelper.getUser();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.roles.includes("ADMIN")) {
        history.push("dashboard");
      } else {
        history.push("my-apps");
      }
    } else history.push("signin");
  }, [isLoggedIn, history]);

  return <div></div>;
};

export default LandingPage;
