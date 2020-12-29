import React from "react";

import {
  CardBody,
  Card,
  CardHeader,
  CardTitle,
} from "reactstrap";

import Timeline from "./Timeline";
import TimelineItem from "./TimelineItem";

class Appointments extends React.Component {
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
          <Timeline>
            <TimelineItem>
              <strong>Chat with Carl and Ashley</strong>
              <span className="float-right text-muted text-sm">30m ago</span>
              <p>
                Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget,
                imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices
                mauris. Integer ante arcu...
              </p>
            </TimelineItem>
            <TimelineItem>
              <strong>The big launch</strong>
              <span className="float-right text-muted text-sm">2h ago</span>
              <p>
                Sed aliquam ultrices mauris. Integer ante arcu, accumsan a,
                consectetuer eget, posuere ut, mauris. Praesent adipiscing.
                Phasellus ullamcorper ipsum rutrum nunc...
              </p>
            </TimelineItem>
            <TimelineItem>
              <strong>Coffee break</strong>
              <span className="float-right text-muted text-sm">3h ago</span>
              <p className="mb-0">
                Curabitur ligula sapien, tincidunt non, euismod vitae, posuere
                imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa.
                Sed cursus turpis vitae tortor...
              </p>
            </TimelineItem>
          </Timeline>
        </CardBody>
      </Card>
    );
  }
}

export default Appointments;
