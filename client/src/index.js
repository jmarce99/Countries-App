import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import Home from "./components/home/Home";
import Countries from "./components/countries/Countries";
import AddActivity from "./components/addactivity/AddActivity";
import SeeMore from "./components/seemore/SeeMore";
import Error404 from "./components/error404/Error404";
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/countries" component={Countries} />
        <Route exact path="/addactivity" component={AddActivity} />
        <Route exact path="/seemore/:id" component={SeeMore} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
