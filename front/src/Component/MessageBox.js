import React from "react";
import Alert from "react-bootstrap/Alert";

function MessageBox(props) {
  return <Alert variant={props.variant || "info"}>{props.Children}</Alert>;
}

export default MessageBox;
