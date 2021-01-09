import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button, Container,
} from "reactstrap";
import store from "../../redux/store";
import {Redirect} from "react-router-dom";

class EditAppointment extends React.Component {
  constructor(props) {
    super(props);

    const appointment = props.appointment || {
      date: '',
      time: '',
      client: null,
      hygienist: '',
      operation: '',
      extra_notes: '',
    };

    // Since this page can be accessed directly by URL, it is possible it will
    // receive no props. We default to true if createMode is not in props.
    const createMode = Object.prototype.hasOwnProperty.call(props, 'createMode')
      ? props.createMode
      : true;

    this.state = {
      appointment,
      createMode,

      dialog: {
        open: false,
        msg: '',
        title: '',
      }
    };

    this.updateValue = () => console.log('TODO Add actions for edit appointments page');
    this.onSubmit = () => console.log('TODO Add actions for edit appointments page');
    this.onCancel = () => console.log('TODO Add actions for edit appointments page');
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardHeader>
            <CardTitle tag="h6" className="text-center mt-4">
              {this.state.createMode ? 'Create appointment' : 'Edit appointment'}
            </CardTitle>
          </CardHeader>
          <CardBody>
            <Form>

              <FormGroup row>
                <Label sm={2} className="text-sm-right">Job Name</Label>
                <Col sm={10}>
                  <Input
                    type="job-name" name="name"
                    placeholder="Enter job name"
                    value="TODO"
                    onChange={this.updateValue}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Job Description</Label>
                <Col sm={10}>
                  <Input
                    type="job-description" name="description"
                    placeholder="Enter job description"
                    value="TODO"
                    onChange={this.updateValue}
                  />
                </Col>
              </FormGroup>

              <div className="text-center mt-3">
                <Button
                  name="cancel-btn"
                  color="secondary" style={{marginRight: '20px'}}
                  onClick={this.onCancel}
                >
                  Cancel
                </Button>
                <Button
                  name="submit-btn"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  Submit
                </Button>
              </div>

            </Form>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

// Since this page can be accessed directly by URL, it is possible it will
// receive no props. Therefore, all props are technically optional.
EditAppointment.propTypes = {
  createMode: PropTypes.bool,
  appointment: PropTypes.object,
};

export default EditAppointment;
