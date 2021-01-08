// Displays appointments.
//
// If the appointments page is visited by a client, all appointments for the client are displayed
// in chronological order. No appointments for other clients are displayed.
//
// If the appointments page is visited by a staff member, all appointments for all clients are
// displayed in chronological order.

import React from 'react';
import store from "../../redux/store";
import { Redirect } from "react-router-dom";

import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
} from "reactstrap";

import * as Actions from '../../redux/actions/appointmentsActions';
import AppointmentsComponent from "../../components/Appointments";
import User from "../../utils/User";
import ConfirmDialog from "../../components/ConfirmDialog";

class Appointments extends React.Component {
  constructor(props) {
    super(props);

    // We assume a user, once logged in, will not be changed from a client to a staff user.
    // If a dental client eventually was hired as staff, or a staff member eventually registered
    // as a client, then they would have two separate accounts.
    const userIsStaff = User.isStaff();

    this.state = {
      appointments: [],
      selectedAppointment: null,
      userIsStaff,
      errorFetchingAppointments: false,
      fetchingAppointments: true,

      dialog: {
        open: false,
        msg: '',
        title: '',
      }
    };

    this.onAppointmentSelected = Actions.onAppointmentSelected.bind(this);
    this.onCancelClicked = Actions.onCancelClicked.bind(this);
    this.onUpdateClicked = Actions.onUpdateClicked.bind(this);
    this.toggleDialog = Actions.toggleDialog.bind(this);
    this.showSuccessDialog = Actions.showSuccessDialog.bind(this);
    this.showErrorDialog = Actions.showErrorDialog.bind(this);
    this.refreshData = Actions.refreshData.bind(this);
  }

  // React best practices are to retrieve information from server
  // in componentDidMount() rather than the constructor
  componentDidMount() {
    this.refreshData();
  }

  render() {
    if (!store.getState().auth.loggedIn) {
      return <Redirect to={{ pathname: '/auth/sign-in', state: { from: window.location.pathname } }} />
    }

    const selectedAppointment = this.state.selectedAppointment;

    if (this.state.fetchingAppointments) {
      return <p>Loading, please wait...</p>;
    } else if (this.state.errorFetchingAppointments) {
      return <p>Failed to load appointments. Try logging out and back in again.</p>;
    }

    // This will sort the appointments in-place, which is fine for this use case
    // TODO If I turn this into a datetime sorting util function, I could unit test it
    this.state.appointments.sort((a, b) => {
      const timestampA = new Date(`${a.date} ${a.time}`);
      const timestampB = new Date(`${b.date} ${b.time}`);
      return timestampA - timestampB;
    });

    return (
      <React.Fragment>

        <Row>
          <Col>
            <AppointmentsComponent
              onAppointmentSelected={this.onAppointmentSelected}
              appointments={this.state.appointments}
            />
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                  {selectedAppointment
                    ? `${selectedAppointment.date} ${selectedAppointment.time}`
                    : 'No appointment selected'}
                </CardTitle>
              </CardHeader>
              <CardBody>
                {selectedAppointment
                  ? (
                    <React.Fragment>
                      <p><strong>Date:</strong>{` ${selectedAppointment.date}`}</p>
                      <p><strong>Time:</strong>{` ${selectedAppointment.time}`}</p>
                      {this.state.userIsStaff
                        ? <p><strong>Client:</strong>{` ${selectedAppointment.client.display_name}`}</p>
                        : null
                      }
                      <p><strong>Hygienist:</strong>{` ${selectedAppointment.hygienist}`}</p>
                      <p><strong>Operation:</strong>{` ${selectedAppointment.operation}`}</p>
                      {selectedAppointment.extraNotes ? (
                        <React.Fragment>
                          <p><strong>Extra Notes:</strong></p>
                          <p>{selectedAppointment.extraNotes}</p>
                        </React.Fragment>
                        ) : null
                      }
                    {this.state.userIsStaff
                      ? (
                        <React.Fragment>
                          <Button
                            onClick={() => this.onCancelClicked(selectedAppointment)}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => this.onUpdateClicked(selectedAppointment)}
                          >
                            Update
                          </Button>
                        </React.Fragment>
                      ) : null
                    }
                    </React.Fragment>
                  )
                  : <p>Select an appointment to view.</p>
                }
              </CardBody>
            </Card>
          </Col>
        </Row>

        {
          !this.state.dialog.open
            ? null
            : (
              <ConfirmDialog
                open={this.state.dialog.open}
                msg={this.state.dialog.msg}
                title={this.state.dialog.title}
                htmlName="appointments-dialog"
                msgHtmlName="appointments-dialog-msg"
                toggleOpenFn={this.toggleDialog}
              />
            )
        }

      </React.Fragment>
    );
  }
}

export default Appointments;
