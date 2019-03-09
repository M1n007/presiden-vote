import React, { Component } from "react";

import "./header.css";

class Header extends Component {
  render() {
    const valueSticky = this.props;
    console.log(valueSticky.valueSticky);
    return (
      <div
        className="app-header"
        style={{
          backgroundColor: "red"
        }}
      >
        <div className="header-content">
          <div className="header-logo">
            <font className="text-logo">JOKOWI ATAU PRABOWO ?</font>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
