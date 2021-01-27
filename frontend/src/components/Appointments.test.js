import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Appointments from "./Appointments";

const NO_APPOINTMENTS_QUERY = '[id="no-appointments-paragraph"]';

describe('appointments tests', () => {

  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('appointments component is rendered correctly', () => {
    const appointments = [
      {
        date: '2021-05-23',
        time: '14:30:00',
        client: {
          display_name: 'Bob Buchanan'
        },
        hygienist: 'Cheryl Holder',
        operation: 'Checkup',
        extra_notes: 'Yearly checkup'
      },
      {
        date: '2021-06-03',
        time: '10:00:00',
        client: {
          display_name: 'Bob Buchanan'
        },
        hygienist: 'Tonya Combs',
        operation: 'Fillings',
        extra_notes: undefined
      }
    ];

    act(() => {
      render(
        <Appointments
          appointments={appointments}
          filtered={false}
          onAppointmentSelected={() => {/*no-op*/}}
          userIsStaff={false}
        />,
        container
      );
    });

    expect(container.querySelector('[id="appointment-0-time"]').textContent)
      .toBe('2021-05-23 14:30:00');
    expect(container.querySelector('[id="appointment-0-operation"]').textContent)
      .toBe('Checkup');

    expect(container.querySelector('[id="appointment-1-time"]').textContent)
      .toBe('2021-06-03 10:00:00');
    expect(container.querySelector('[id="appointment-1-operation"]').textContent)
      .toBe('Fillings');
  });

  it('message is displayed if there are no appointments - not filtered', () => {
    act(() => {
      render(
        <Appointments
          appointments={[]}
          filtered={false}
          onAppointmentSelected={() => {/*no-op*/}}
          userIsStaff={false}
        />,
        container
      );
    });

    expect(container.querySelector(NO_APPOINTMENTS_QUERY).textContent)
      .toBe('No appointments');
  });

  it('message is displayed if there are no appointments - filtered', () => {
    act(() => {
      render(
        <Appointments
          appointments={[]}
          filtered={true}
          onAppointmentSelected={() => {/*no-op*/}}
          userIsStaff={false}
        />,
        container
      );
    });

    expect(container.querySelector(NO_APPOINTMENTS_QUERY).textContent)
      .toBe('No appointments for filter');
  });

});
