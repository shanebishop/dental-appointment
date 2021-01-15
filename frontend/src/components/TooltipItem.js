/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const TooltipItem = props => {
  const { position='top', id } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <span id={`tooltip-${id}`}>
        {props.children}
      </span>
      <Tooltip
        placement={position}
        isOpen={tooltipOpen}
        target={`tooltip-${id}`}
        toggle={toggle}
      >
        {props.title}
      </Tooltip>
    </span>
  );
};

export default TooltipItem;
