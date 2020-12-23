/* eslint-disable react/prop-types */

import React from "react";
import { connect } from "react-redux";

const Wrapper = ({ layout, children }) => (
  <div className={"wrapper " + (layout.isBoxed ? "wrapper-boxed" : "")}>
    {children}
  </div>
);

export default connect(store => ({
  layout: store.layout
}))(Wrapper);
