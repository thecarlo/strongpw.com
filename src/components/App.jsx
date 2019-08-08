import React, { Component } from "react";
import GeneratePassword from "./GeneratePassword";
import "../assets/css/app.css";

class App extends Component {
  render() {
    return (
      <div id="app-container" className="container">
        <h1 id="heading">Strong password generator</h1>
        <GeneratePassword />
      </div>
    );
  }
}

export default App;
