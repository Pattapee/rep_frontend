
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.2.0";
import "assets/css/demo.css";
import "react-datepicker/dist/react-datepicker.css";


import AdminLayout from "layouts/Admin.jsx";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/omb" render={props => <AdminLayout {...props} />} />
      <Redirect to="/omb/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
