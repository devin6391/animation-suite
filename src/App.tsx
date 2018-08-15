import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AppBar } from "./examples/slider/index";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/slider" component={AppBar} />
        </div>
      </Router>
    );
  }
}

export default App;
