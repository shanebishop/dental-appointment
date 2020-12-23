import React from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";

import FullCalendar from '@fullcalendar/react'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

const demoEvents = [
  {
    title: 'All Day Event',
    start: '2020-07-01'
  },
  {
    title: 'Long Event',
    start: '2020-07-07',
    end: '2020-07-10'
  },
  {
    groupId: '999',
    title: 'Repeating Event',
    start: '2020-07-09T16:00:00'
  },
  {
    groupId: '999',
    title: 'Repeating Event',
    start: '2020-07-16T16:00:00'
  },
  {
    title: 'Conference',
    start: '2020-07-11',
    end: '2020-07-13'
  },
  {
    title: 'Meeting',
    start: '2020-07-12T10:30:00',
    end: '2020-07-12T12:30:00'
  },
  {
    title: 'Lunch',
    start: '2020-07-12T12:00:00'
  },
  {
    title: 'Meeting',
    start: '2020-07-12T14:30:00'
  },
  {
    title: 'Birthday Party',
    start: '2020-07-13T07:00:00'
  },
  {
    title: 'Click for Google',
    url: 'http://google.com/',
    start: '2020-07-28'
  }
];

const Calendar = () => {
  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Calendar</h1>

      <Card>
        <CardHeader />
        <CardBody>
        <FullCalendar
          plugins={[ bootstrapPlugin, dayGridPlugin, timeGridPlugin ]}
          themeSystem="bootstrap"
          initialView="dayGridMonth"
          initialDate="2020-07-07"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={demoEvents}
          bootstrapFontAwesome={false}
        />
        </CardBody>
      </Card>
    </Container>
  )
}

export default Calendar;
