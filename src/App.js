import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./component/screen/Login";
import Home from "./component/screen/Home";
import Example from "./component/screen/Example";
import Laporan from "./component/screen/Laporan";
import Register from "./component/screen/Register";
export default function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Route exact path="/" component={Login} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/example" component={Example} />
      <Route exact path="/laporan" component={Laporan} />
      <Route exact path="/register" component={Register} />
    </Router>
  );
}
