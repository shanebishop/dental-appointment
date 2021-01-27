import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import axios from 'axios';
import store from "../../redux/store";
import Appointments from "./Appointments";

jest.mock('axios');
jest.mock('../../redux/store');

// Provide mock implementation for store.getState()
store.getState = () => {
  return {auth: {loggedIn: true}};
};

describe('Appointments page tests', () => {

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

  it('Appointments page renders properly', () => {
    const response = {
      data: [
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
      ]
    };
    axios.get.mockResolvedValue(response);

    act(() => {
      render(
        <Appointments />,
        container
      );
    });

    // Nothing to assert, since we are just checking the component renders
  });

});
