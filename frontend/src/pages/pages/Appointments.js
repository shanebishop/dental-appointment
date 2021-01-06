// Displays appointments.
//
// If the appointments page is visited by a client, all appointments for the client are displayed
// in chronological order. No appointments for other clients are displayed.
//
// If the appointments page is visited by a staff member, all appointments for all clients are
// displayed in chronological order.

import React, { useEffect } from 'react';
import store from "../../redux/store";
import { Redirect } from "react-router-dom";

import {
  Col,
  Row,
  Card,
  CardBody,
  CardHeader, CardTitle,
} from "reactstrap";

import * as Actions from '../../redux/actions/appointmentsActions';
import AppointmentsComponent from "../../components/Appointments";
import User from "../../utils/User";

class Appointments extends React.Component {
  constructor(props) {
    super(props);

    // We assume a user, once logged in, will not be changed from a client to a staff user.
    // If a dental client eventually was hired as staff, or a staff member eventually registered
    // as a client, then they would have two separate accounts.
    const userIsStaff = User.isStaff();

    this.state = {
      // TODO Appointments should be fetched from backend, based on whether the user is a client or staff member
      appointments: [
        {
          date: 'foo',
          time: 'foo',
          hygienist: 'foo',
          operation: 'foo',
          extraNotes: null,
        },
        {
          date: 'bar',
          time: 'bar',
          hygienist: 'bar',
          operation: 'bar',
          extraNotes: 'Some extra notes',
        }
      ],

      selectedAppointment: null,
      userIsStaff,
    };

    this.onAppointmentSelected = Actions.onAppointmentSelected.bind(this);
  }

  render() {
    if (!store.getState().auth.loggedIn) {
      return <Redirect to={{ pathname: '/auth/sign-in', state: { from: window.location.pathname } }} />
    }

    const selectedAppointment = this.state.selectedAppointment;

    return (
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
                    <p><strong>Hygienist:</strong>{` ${selectedAppointment.hygienist}`}</p>
                    <p><strong>Operation:</strong>{` ${selectedAppointment.operation}`}</p>
                    {selectedAppointment.extraNotes ? (
                      <React.Fragment>
                        <p><strong>Extra Notes:</strong></p>
                        <p>{selectedAppointment.extraNotes}</p>
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
    );
  }
}

export default Appointments;
