import React from "react";
import PropTypes from "prop-types";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
  Button,
} from "reactstrap";

import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";

const Appointments = (props) => {
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
      {props.userIsStaff ? <Button>Schedule a new appointment</Button> : null}
      <CardBody className="d-flex">
        {(props.appointments.length !== 0)
          ? (
            <Timeline style={{width: "100%"}}>
              {props.appointments.map((appointment, index) => (
                // The 'cursor: pointer' changes the cursor to a pointing hand on mouse hover.
                <TimelineItem
                  key={index}
                  name={`appointment-${index}`}
                  style={{cursor: "pointer"}}
                  onClick={() => props.onAppointmentSelected(appointment)}
                >
                  <strong id={`appointment-${index}-time`}>
                    {`${appointment.date} ${appointment.time}`}
                  </strong>
                  <span className="float-right text-muted text-sm">30m ago</span>
                  <p>{appointment.operation}</p>
                </TimelineItem>
              ))}
            </Timeline>
          ) : <p id="no-appointments-paragraph">No appointments</p>
        }
      </CardBody>
    </Card>
  );
}

Appointments.propTypes = {
  appointments: PropTypes.array.isRequired,
  onAppointmentSelected: PropTypes.func.isRequired,
  userIsStaff: PropTypes.bool.isRequired,
};

export default Appointments;
