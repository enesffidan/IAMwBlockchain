import React, { useCallback } from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { getViewAuthorizationForAll } from "./helpers/AuthorizationHelper";
import SessionHelper from "./helpers/SessionHelper";
import LanguageHelper from "./helpers/LanguageHelper";
import Navbar from "./components/Navbar/navbar";
import MyAppsPage from "./pages/myapps/MyAppsPage";
import SignIn from "./pages/signin/SignIn";
import DashboardPage from "./pages/dashboard/DashboardPage";
// import SignUp from "./pages/SignUp/SignUp";
// import Activation from "./pages/AccountActivated/AccountActivated";
// import Forgot from "./pages/ForgotPassword/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { LandingPage } from "./pages/landingPage";
import AddAppsPage from "./pages/userApps/AddApps";
import PeoplePage from "./pages/people/PeoplePage";
import AppsPage from "./pages/applications/AppsPage";
import UserDetail from "./pages/people/userdetail/UserDetail";
import AssignApps from "./pages/applications/AssignApps";
import AppDetail from "./pages/applications/appdetail/AppDetail";

const auth = [
  {
    path: "/signin",
    component: SignIn,
    exact: false,
  },
  //   {
  //     path: "/signup",
  //     component: SignUp,
  //     exact: false,
  //   },
  //   {
  //     path: "/forgot",
  //     component: Forgot,
  //     exact: false,
  //   },
  //   {
  //     path: "/reset",
  //     component: ResetPassword,
  //     exact: false,
  //   },
  //   {
  //     path: "/activation",
  //     component: Activation,
  //     exact: false,
  //   },
];

const publicRoutes = [
  {
    path: "/dashboard",
    component: DashboardPage,
  },
  {
    path: "/my-apps",
    component: MyAppsPage,
  },
  {
    path: "/add-apps",
    component: AddAppsPage,
  },
  {
    path: "/people",
    component: PeoplePage,
  },
  {
    path: "/user",
    component: UserDetail,
  },
  {
    path: "/apps",
    component: AppsPage,
  },
  {
    path: "/assign-apps",
    component: AssignApps,
  },
  {
    path: "/app",
    component: AppDetail,
  },
];

function PrivateRoute({ children, ...rest }) {
  //const isLoggedIn = useSelector((state) => state.Auth.idToken);
  const isLoggedIn = SessionHelper.getIsLoggedIn();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  const language = LanguageHelper.getLanguage();
  const user = SessionHelper.getUser();

  const [drawerList, setDrawerList] = React.useState([]);
  const [update, setUpdate] = React.useState(false);

  const populateDrawerList = useCallback(() => {
    console.log(user);
    if (user) {
      const roles = user.roles;
      const authorization = getViewAuthorizationForAll(roles);
      let drawerList = [
        // DASHBOARD
        authorization.dashboard && {
          label: language.sidebar.dashboard,
          Path: "/dashboard",
        },
        authorization.myApps && {
          label: "My Apps",
          Path: "/my-apps",
        },
        authorization.addApps && { label: "Add Apps", Path: "/add-apps" },
        authorization.people && { label: "People", Path: "/people" },
        authorization.apps && { label: "Applications", Path: "/apps" },
      ];
      setDrawerList(drawerList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, user, update]);

  const init = useCallback(() => {
    populateDrawerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [populateDrawerList, update]);
  React.useEffect(() => {
    init();
  }, [init, user]);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          {auth.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact}>
              <route.component update={update} setUpdate={setUpdate} />
            </Route>
          ))}
          <PrivateRoute path="/">
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <Navbar
                  component={<route.component />}
                  drawerList={drawerList}
                />
              </Route>
            ))}
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}
