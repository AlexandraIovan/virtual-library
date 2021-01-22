import { useState } from "react";
import { TOKEN } from "./constants";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Books } from "./Books";
import { Authentication } from "./Authentication";
import "./App.css";

const storageToken = localStorage.getItem(TOKEN);

function App() {
  const [token, setToken] = useState(storageToken);

  function setAuthToken(authToken) {
    setToken(authToken);
    localStorage.setItem(TOKEN, authToken);
  }

  function removeAuthToken() {
    setToken(null)
    localStorage.removeItem(TOKEN);
  }

  if (!token) {
    return <Authentication setAuthToken={setAuthToken} />;
  }

  return (
    <div className="container-fluid">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Books token={token} removeAuthToken={removeAuthToken} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <p className="py-5 text-center text-muted">
        ©Copyright 2021 - Iovan Alexandra
      </p>
    </div>
  );
}

export default App;
