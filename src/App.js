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
          <div className="personalInfo">
            Developed with ❤️ by <a href="mailto:alfonsorognoni@gmail.com?Subject=Contacto%20from%20swapp">Alfonso Rognoni</a> 👨🏻‍💻
          </div>
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