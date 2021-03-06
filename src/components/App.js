import React, { useEffect, lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { FullpageLoader } from "./CommonComponents";

// Components Import
import Login from "../components/Login";
import Layout from "../components/Layout";
import Home from "../components/Home";
import ProductsWomen from "./ProductsWomen";
import ProductsMen from "./ProductsMen";
import Categories from "./Categories";
import Customers from "./Customers";
import Orders from "./Orders";
import ChangePassword from "./ChangePassword";

import { setCurrentUser, logoutUser } from "../redux/actions/authActions";
import jwtDecode from "jwt-decode";

// const Account = lazy(() => import("../components/Account"));

const App = ({ auth, setCurrentUser, logoutUser }) => {
  let token = localStorage.getItem("jwtToken");

  if (token) {
    const { email, exp, iat } = jwtDecode(token);
    // console.log(Date(exp));
    // console.log(Date(iat));
    // console.log(new Date().toTimeString());
    setCurrentUser({ email });
    // console.log(jwtDecode(token));
  }

  if (!auth) return <Login />;
  else {
    return (
      <BrowserRouter>
        {/* <Suspense fallback={<FullpageLoader />}> */}
        <Switch>
          <Layout>
            <Route exact path="/" component={() => <Home />} />
            <Route
              exact
              path="/products-men"
              component={() => <ProductsMen />}
            />
            <Route
              exact
              path="/products-women"
              component={() => <ProductsWomen />}
            />
            <Route exact path="/categories" component={() => <Categories />} />
            <Route exact path="/customers" component={() => <Customers />} />
            <Route exact path="/orders" component={() => <Orders />} />
            <Route
              exact
              path="/settings"
              component={() => <ChangePassword />}
            />
          </Layout>
        </Switch>
        {/* </Suspense> */}
      </BrowserRouter>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setCurrentUser, logoutUser })(App);
