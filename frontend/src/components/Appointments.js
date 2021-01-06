import React from "react";
import PropTypes from "prop-types";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap";

import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";

class Appointments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: props.appointments
    };
  }

  render() {
    return (
      <Card className="flex-fill w-100">
        <CardHeader>
          <CardTitle tag="h5" className="mb-0">
            Appointments
          </CardTitle>
        </CardHeader>
        <div className="p-4 bg-light">
          <h2>You have an appointment today!</h2>
          <p className="mb-0 text-sm">
            Your next appointment is in 2 hours.
          </p>
        </div>
        <CardBody className="d-flex">
          {this.state.appointments
            ? (
              <Timeline style={{width: "100%"}}>
                {this.state.appointments.map((appointment, index) => (
                  // The 'cursor: pointer' changes the cursor to a pointing hand on mouse hover.
                  <TimelineItem
                    key={index}
                    style={{cursor: "pointer"}}
                    onClick={() => this.props.onAppointmentSelected(appointment)}
                  >
                    <strong>{`${appointment.date} ${appointment.time}`}</strong>
                    <span className="float-right text-muted text-sm">30m ago</span>
                    <p>{appointment.operation}</p>
                  </TimelineItem>
                ))}
              </Timeline>
            )
            : <p>No appointments</p>
          }
        </CardBody>
      </Card>
    );
  }
}

Appointments.propTypes = {
  appointments: PropTypes.array.isRequired,
  onAppointmentSelected: PropTypes.func.isRequired,
};

export default Appointments;
