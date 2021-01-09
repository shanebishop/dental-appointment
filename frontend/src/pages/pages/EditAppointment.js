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
  Button,
} from "reactstrap";

import store from "../../redux/store";
import {Redirect} from "react-router-dom";
import CustomDropdown from "../../components/CustomDropdown";

class EditAppointment extends React.Component {
  constructor(props) {
    super(props);

    const appointment = props.appointment || {
      date: '',
      time: '',
      client: {
        display_name: '',
        username: '',
      },
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
    if (!store.getState().auth.loggedIn) {
      return <Redirect to={{ pathname: '/auth/sign-in', state: { from: window.location.pathname } }} />
    }

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
                <Label sm={2} className="text-sm-right">Date</Label>
                <Col sm={10}>
                  <Input
                    name="date"
                    placeholder="Enter appointment date"
                    value={this.state.appointment.date}
                    onChange={this.updateValue}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Time</Label>
                <Col sm={10}>
                  <Input
                    name="time"
                    placeholder="Enter appointment time"
                    value={this.state.appointment.time}
                    onChange={this.updateValue}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Client</Label>
                <Col sm={10}>
                  <Input
                    name="client"
                    placeholder="Enter client"
                    value={this.state.appointment.client.display_name}
                    onChange={this.updateValue}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Hygienist</Label>
                <Col sm={10}>
                  <Input
                    name="hygienist"
                    placeholder="Enter hygienist"
                    value={this.state.appointment.hygienist}
                    onChange={this.updateValue}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Operation</Label>
                <Col sm={10}>
                  <CustomDropdown
                    id="operation-dropdown" values={['TODO']}
                    onChange={() => console.log('TODO')}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Extra notes</Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="extra_notes"
                    placeholder="Enter extra notes here"
                    rows="3"
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
