import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Results from './Results';
const Details = lazy(() => import("./Details"));

export default function App() {
  return (
    <Router>
      <div>
        <header>
          <Link to="/" className="logo">QU Swapi</Link>
        </header>
        <main className="content">
          <Suspense fallback={<h1>Loading Route...</h1>}>
            <Switch>
              <Route exact path="/">
                <Results type="planets"/>
              </Route>
              <Route path="/details/:id">
                <Details />
              </Route>
              
            </Switch>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};