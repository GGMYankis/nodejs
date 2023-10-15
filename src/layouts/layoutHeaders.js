import React from "react";
import Header from "../components/Header/Header";
import "./layout.css";
import { Container } from "semantic-ui-react";
function LayoutHeaders(props) {
  const { children } = props;
  return (
    <>
      <Header />

      <div className="container">{children}</div>
    </>
  );
}

export default LayoutHeaders;
