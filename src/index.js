import React from "react";
import { render } from "react-dom";

const App = () => {
  return (
    <div>
      <header>
        <a href="/">QU Swapi</a>
      </header>
      <main>
        HI!!
      </main>
    </div>
  );
};

render(<App />, document.getElementById("root"));