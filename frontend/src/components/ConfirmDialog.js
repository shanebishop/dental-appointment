import React from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap';

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      msg: props.msg,
      title: props.title,
      htmlName: props.htmlName,
      msgHtmlName: props.msgHtmlName,
      btnText: props.btnText || 'OK',
      parentToggleOpenFn: props.toggleOpenFn,
    };
  }

  toggleOpen() {
    this.setState({open: !this.state.open});
    this.state.parentToggleOpenFn();
  }

  render() {
    const toggleOpen = this.toggleOpen.bind(this);

    return (
      <Modal
        isOpen={this.state.open}
        toggle={toggleOpen}
        name={this.state.htmlName}
      >
        <ModalHeader toggle={toggleOpen}>{this.state.title}</ModalHeader>
        <ModalBody className="text-center m-3">
          <p className="mb-0" name={this.state.msgHtmlName}>
            {this.state.msg || 'Message not found'}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            name={`${this.state.htmlName}-btn`}
            color="primary"
            onClick={toggleOpen}
          >
            {this.state.btnText}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  msg: PropTypes.string.isRequired,
  toggleOpenFn: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  htmlName: PropTypes.string.isRequired,
  msgHtmlName: PropTypes.string.isRequired,
  btnText: PropTypes.string,
};

export default ConfirmDialog;
