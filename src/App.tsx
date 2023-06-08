import React from "react";
import { CreateHexagonal } from "./components/hexagonal/CreateHexagonal";
import { HexagonalContextProvider } from "./contexts/Hexagonal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoadingContextProvider } from "./contexts/Loading";
import HexagonNeighbors from "./components/hexagonal/HexagonNeighbors";

const App: React.FC = () => {
  return (
    //Provide the loading and user context to all routes.
    <LoadingContextProvider>
      <HexagonalContextProvider>
        {/* Setup the routes */}
        <Router>
          <Switch>
            {/* create hexagonal */}
            <Route exact path="/create-hexagonal" component={CreateHexagonal} />

            {/* hexagonal neighbor */}
            <Route
              exact
              path="/hexagonal-neighbor/:hexagonalName"
              render={({ match }) => (
                <HexagonNeighbors hexagonalName={match.params.hexagonalName} />
              )}
            />
          </Switch>
        </Router>
      </HexagonalContextProvider>
    </LoadingContextProvider>
  );
};

export default App;
