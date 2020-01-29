import React, { Component, Fragment } from "react";
import OffCanvas from "react-aria-offcanvas";
import Navigation from "./nav";
import { MdMenu, MdHighlightOff } from "react-icons/md";

export default class App extends Component {
  state = {
    isOpen: false
  };

  open = () => {
    this.setState({ isOpen: true });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    return (
      <Fragment>
        <button
          id="menu-button"
          aria-label="Menu"
          aria-controls="menu"
          aria-expanded={this.state.isOpen}
          onClick={this.open}
        >
          <MdMenu />
        </button>
        <OffCanvas
          isOpen={this.state.isOpen}
          onClose={this.close}
          labelledby="menu-button"
          height="100%"
          position="right"
          style={({}, { background: "#ff0" })}
          overlayClassName="overlay"
        >
          <button onClick={this.close}>
            <MdHighlightOff />
          </button>
          <nav role="navigation" id="offcanvas-menu">
            <Navigation />
          </nav>
        </OffCanvas>
      </Fragment>
    );
  }
}
