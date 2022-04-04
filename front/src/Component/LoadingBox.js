import React from "react";
import Spinner from "react-bootstrap/Spinner";

function LoadingBox() {
  return (
    <Spinner animation="border" role="status">
      <span className="vissually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingBox;
