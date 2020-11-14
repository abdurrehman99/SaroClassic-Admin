import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { FullpageLoader } from "./CommonComponents";
import Layout from "../components/Layout";
import Account from "../components/Account";
import Login from "../components/Login";
import AccountDetails from "../components/AccountDetails";
import Home from "../components/Home";
import { setCurrentUser } from "../redux/actions/authActions";
import jwtDecode from "jwt-decode";

// const Account = lazy(() => import("../components/Account"));

const App = ({ auth, setCurrentUser }) => {
  useEffect(() => {
    let token = localStorage.getItem("jwtToken");

    if (token) {
      const { email, exp, iat } = jwtDecode(token);
      console.log(Date(exp));
      console.log(Date(iat));
      console.log(new Date().toTimeString());

      setCurrentUser(email);
      console.log(jwtDecode(token));
    } else {
    }
  }, []);

  if (!auth) return <Login />;
  else {
    return (
      <BrowserRouter>
        <Suspense fallback={<FullpageLoader />}>
          <Switch>
            <Layout>
              <Route exact path="/account" component={() => <Account />} />
              <Route
                exact
                path="/account-details"
                component={() => <AccountDetails />}
              />
              <Route exact path="/" component={() => <Home />} />
            </Layout>
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setCurrentUser })(App);
