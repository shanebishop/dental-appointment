// TODO See if I have better documentation for this component somewhere

import React from "react";
import PropTypes from 'prop-types';

import {
  CustomInput,
} from "reactstrap";

class CustomDropdown extends React.Component {
  constructor(props) {
    super(props);

    const value = Object.prototype.hasOwnProperty.call(props, 'value')
      ? props.value
      : props.values[0];

    this.state = {
      isOpen: false,
      value,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const items = this.props.values.map(val =>
      <option key={val}>{val}</option>
    );

    return (
      <CustomInput
        type="select"
        className="mb-3"
        id={this.props.id}
        value={this.state.value}
        onChange={this.props.onChange}
      >
        {items}
      </CustomInput>
    );
  }
}

CustomDropdown.propTypes = {
  values: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default CustomDropdown;
