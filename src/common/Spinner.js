import React from "react";

export default class Spinner extends React.Component {
  render() {
    return (
      <div className="full-width">
        <div className="spinner-border spinner-wide-handling " role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
