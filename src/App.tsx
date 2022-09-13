import React, { Fragment } from "react";
import GlobalStyle from "./GlobalStyle";
import { Home } from "./pages/Home";
function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <Home />
    </Fragment>
  );
}

export default App;
