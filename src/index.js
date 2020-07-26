import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Results from './Results';
import Details from "./Details";

const App = () => {
  return (
    <Router>
      <div>
        <header>
          <Link to="/" className="logo">QU Swapi</Link>
        </header>
        <main>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <Results type="planets"/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

render(<App />, document.getElementById("root"));