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
import {Link} from "react-router-dom";
import TimeAgo from 'javascript-time-ago';

// English locale
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

function timeDeltaDisplay(appointment) {
  const time = new Date(`${appointment.date} ${appointment.time}`);
  return timeAgo.format(time);
}

const Appointments = (props) => {
  return (
    <Card className="flex-fill w-100">
      <CardHeader>
        <CardTitle tag="h5" className="mb-0">
          Appointments
        </CardTitle>
      </CardHeader>
      {props.userIsStaff
        ? <Link to="/edit-appointment"><Button style={{width: "100%"}}>Schedule a new appointment</Button></Link>
        : null
      }
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
                  <span className="float-right text-muted text-sm">{timeDeltaDisplay(appointment)}</span>
                  <p>{props.userIsStaff ? `${appointment.operation} for ${appointment.client.display_name}` : appointment.operation}</p>
                </TimelineItem>
              ))}
            </Timeline>
          ) : <p id="no-appointments-paragraph">{props.filtered ? 'No appointments for filter' : 'No appointments'}</p>
        }
      </CardBody>
    </Card>
  );
}

Appointments.propTypes = {
  appointments: PropTypes.array.isRequired,
  filtered: PropTypes.bool.isRequired,
  onAppointmentSelected: PropTypes.func.isRequired,
  userIsStaff: PropTypes.bool.isRequired,
};

export default Appointments;
