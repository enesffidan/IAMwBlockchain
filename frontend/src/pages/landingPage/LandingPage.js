import React, { useEffect } from "react";
import SessionHelper from "../../helpers/SessionHelper";
import { useHistory } from "react-router-dom";

const LandingPage = () => {
  const history = useHistory();
  const isLoggedIn = SessionHelper.getIsLoggedIn();

  useEffect(() => {
    console.log("LoggedIn = ", isLoggedIn);
    if (isLoggedIn) {
      history.push("dashboard");
    } else history.push("signin");
  }, [isLoggedIn, history]);

  return <div></div>;
};

export default LandingPage;
