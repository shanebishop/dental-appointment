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
  Input,
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
      filteredAppointments: [],
      selectedAppointment: null,
      userIsStaff,
      errorFetchingAppointments: false,
      fetchingAppointments: true,
      filterText: '',

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
    this.onFilterChanged = Actions.onFilterChanged.bind(this);
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
    this.state.filteredAppointments.sort((a, b) => {
      const timestampA = new Date(`${a.date} ${a.time}`);
      const timestampB = new Date(`${b.date} ${b.time}`);
      return timestampA - timestampB;
    });

    return (
      <React.Fragment>

        {this.state.userIsStaff
          ? (
            <Row style={{marginBottom: '20px', marginLeft: '5px', marginRight: '5px'}}>
              <Input name="filter-input" placeholder="Enter text to filter by client name" onChange={this.onFilterChanged} />
            </Row>
          ) : null}
        <Row>
          <Col>
            <AppointmentsComponent
              onAppointmentSelected={this.onAppointmentSelected}
              filtered={!!this.state.filterText}
              appointments={this.state.filteredAppointments}
              userIsStaff={this.state.userIsStaff}
            />
          </Col>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle id="selected-appointment-details-card-title" tag="h5" className="mb-0">
                  {selectedAppointment
                    ? `${selectedAppointment.date} ${selectedAppointment.time}`
                    : 'No appointment selected'}
                </CardTitle>
              </CardHeader>
              <CardBody>
                {selectedAppointment
                  ? (
                    <React.Fragment>
                      <p id="appointment-date"><strong>Date:</strong>{` ${selectedAppointment.date}`}</p>
                      <p id="appointment-time"><strong>Time:</strong>{` ${selectedAppointment.time}`}</p>
                      {this.state.userIsStaff
                        ? (
                            <p id="appointment-client-display-name">
                              <strong>Client:</strong>{` ${selectedAppointment.client.display_name}`}
                            </p>
                        ) : null
                      }
                      <p id="appointment-hygienist"><strong>Hygienist:</strong>{` ${selectedAppointment.hygienist}`}</p>
                      <p id="appointment-operation"><strong>Operation:</strong>{` ${selectedAppointment.operation}`}</p>
                      {selectedAppointment.extra_notes ? (
                        <React.Fragment>
                          <p id="appointment-extra-notes-label"><strong>Extra Notes:</strong></p>
                          <p id="appointment-extra-notes-content">{selectedAppointment.extra_notes}</p>
                        </React.Fragment>
                        ) : null
                      }
                    {this.state.userIsStaff
                      ? (
                        <div className="text-center mt-3">
                          <Button name="cancel-appointment-btn" style={{marginRight: '20px'}} onClick={() => this.onCancelClicked(selectedAppointment)}>
                            Cancel appointment
                          </Button>
                          <Button name="update-appointment-btn" onClick={() => this.onUpdateClicked(selectedAppointment)}>
                            Update appointment
                          </Button>
                        </div>
                      ) : null
                    }
                    </React.Fragment>
                  )
                  : <p>{this.state.userIsStaff ? 'Select an appointment to view, update, or cancel.' : 'Select an appointment to view.'}</p>
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
