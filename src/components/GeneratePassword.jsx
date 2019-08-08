import React, { Component } from "react";
import InputRange from "react-input-range";
import "../assets/css/generate-password.scss";
import generator from "generate-password";
import Info from "./Info";

class GeneratePassword extends Component {
  constructor(props) {
    super(props);
    this.state = { password: "", type: "text", value: 30 };

    this.onGenerate = this.onGenerate.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.onLengthChange = this.onLengthChange.bind(this);
  }

  getPassword() {
    var result = generator.generate({
      length: this.state.value,
      numbers: true,
      symbols: true,
      uppercase: true,
      strict: true,
      exclude: `"`
    });
    this.setState({ password: result });
  }

  componentDidMount() {
    this.getPassword();
  }

  onGenerate() {
    this.getPassword();
  }

  onLengthChange(e) {
    this.setState({ value: e });
    this.getPassword();
  }

  copyToClipboard = e => {
    document.getElementById("password").select();
    document.execCommand("copy");
  };

  render() {
    return (
      <React.Fragment>
        <div id="password-container">
          <form className="form-inline">
            <input
              id="password"
              type="text"
              value={this.state.password}
              readOnly
            />
            <i
              className="button fal fa-copy"
              id="copy"
              data-toggle="tooltip"
              title="Copy password"
              onClick={this.copyToClipboard}
            />
            <i
              className="button fal fa-sync-alt"
              id="generate"
              data-toggle="tooltip"
              title="Generate"
              onClick={this.onGenerate}
            />
          </form>
        </div>

        <InputRange
          minValue={12}
          maxValue={100}
          step={1}
          value={this.state.value}
          onChange={this.onLengthChange}
        />

        <Info />
      </React.Fragment>
    );
  }
}

export default GeneratePassword;
