import React, { Component } from "react";
import GeneratePassword from "./GeneratePassword";
import "../assets/css/app.scss";

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <div id="app-container" className="container">
          <h1 id="heading">Strong password generator</h1>
          <GeneratePassword />
        </div>

        <div id="footer-container" className="container">
          <a target="_blank" title="Source code on Github" href="https://github.com/thecarlo/strongpw.com"><i id="github-icon" className="fab fa-github"></i> Source code</a>
        </div>
      </React.Fragment>
    );
  }
}

export default App;