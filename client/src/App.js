import React, { useEffect, useRef, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";

const App = () => {
  return (
    <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/chat/:user" component={Chat} />
        </Switch>
    </div>
  );
};

export default App;
