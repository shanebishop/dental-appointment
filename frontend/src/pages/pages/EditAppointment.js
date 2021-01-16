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

import * as Actions from '../../redux/actions/editAppointmentActions';
import ConfirmDialog from "../../components/ConfirmDialog";
import store from "../../redux/store";
import {Redirect} from "react-router-dom";
import CustomDropdown from "../../components/CustomDropdown";

class EditAppointment extends React.Component {
  static OPERATIONS = [
    'Checkup',
    'Fillings',
    'Root canal',
    'Wisdom tooth extraction',
    'Tooth extraction',
    'Dental implants',
    'Reconstructive surgery',
    'Cosmetic surgery',
    'Teeth whitening',
    'Dentures',
  ];

  constructor(props) {
    super(props);

    const appointmentPropProvided = props && props.location && props.location.state && props.location.state.appointment;
    const createMode = !appointmentPropProvided;

    const appointment = appointmentPropProvided ? props.location.state.appointment : {
      date: '',
      time: '',
      client: {
        username: '',
      },
      hygienist: '',
      operation: EditAppointment.OPERATIONS[0],
      extra_notes: '',
    };

    console.log(appointment);

    if (!createMode && !appointment.id) {
      // If in update mode, the appointment ID must be set
      throw new Error('Appointment ID not set with update mode');
    }

    this.state = {
      appointment,
      createMode,

      dialog: {
        open: false,
        msg: '',
        title: '',
      }
    };

    this.updateValue = Actions.updateValue.bind(this);
    this.onSubmit = Actions.onSubmit.bind(this);
    this.onCancel = Actions.onCancel.bind(this);
    this.updateOperation = Actions.updateOperation.bind(this);
    this.updateClient = Actions.updateClient.bind(this);
    this.submitButtonEnabled = Actions.submitButtonEnabled.bind(this);
    this.showSuccessDialog = Actions.showSuccessDialog.bind(this);
    this.showErrorDialog = Actions.showErrorDialog.bind(this)
    this.toggleDialog = Actions.toggleDialog.bind(this);
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
                    placeholder="YYYY-MM-DD"
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
                    placeholder="hh:mm"
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
                    placeholder="Enter client's username"
                    value={this.state.appointment.client.username}
                    onChange={this.updateClient}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Hygienist</Label>
                <Col sm={10}>
                  <Input
                    name="hygienist"
                    placeholder="Enter hygienist's full name"
                    value={this.state.appointment.hygienist}
                    onChange={this.updateValue}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Operation</Label>
                <Col sm={10}>
                  <CustomDropdown
                    id="operation-dropdown"
                    values={EditAppointment.OPERATIONS}
                    value={this.state.appointment.operation}
                    onChange={this.updateOperation}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2} className="text-sm-right">Extra notes</Label>
                <Col sm={10}>
                  <Input
                    type="textarea"
                    name="extra_notes"
                    placeholder="(Optionally) enter extra notes here"
                    rows="3"
                    value={this.state.appointment.extra_notes}
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
                  disabled={!this.submitButtonEnabled()}
                  onClick={this.onSubmit}
                >
                  Submit
                </Button>
              </div>

            </Form>
          </CardBody>
        </Card>

        {
          !this.state.dialog.open
            ? null
            : (
              <ConfirmDialog
                open={this.state.dialog.open}
                msg={this.state.dialog.msg}
                title={this.state.dialog.title}
                htmlName="edit-appointment-dialog"
                msgHtmlName="edit-appointment-dialog-msg"
                toggleOpenFn={this.toggleDialog}
              />
            )
        }

      </React.Fragment>
    );
  }
}

// Since this page can be accessed directly by URL, it is possible it will
// receive no props. Therefore, all props are technically optional.
EditAppointment.propTypes = {
  location: PropTypes.object
};

export default EditAppointment;
