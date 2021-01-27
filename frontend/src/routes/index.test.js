/* global jest describe it expect */

// These tests use Jest mocking.
// For information on mocking with Jest, see https://jestjs.io/docs/en/es6-class-mocks

import {displayRoute} from "./index";
import User from "../utils/User";

jest.mock("../utils/User");

describe('routes are displayed or not displayed correct', () => {

  it('route is not displayed if displayInSidebar is false', () => {
    const route = {displayInSidebar: false};
    expect(displayRoute(route)).toBeFalsy();
  });

  it('route is displayed if it is not staff only', () => {
    const route = {
      displayInSidebar: true,
      staffOnlyRoute: false,
    };
    expect(displayRoute(route)).toBeTruthy();
  });

  it('route is not displayed if it staff only but displayInSidebar is false', () => {
    const route = {
      displayInSidebar: false,
      staffOnlyRoute: false,
    };
    expect(displayRoute(route)).toBeFalsy();
  });

  it('staff-only routes are not displayed if user is not logged in', () => {
    User.isLoggedIn = jest.fn(() => false);
    User.isStaff = jest.fn(() => false);

    const route = {
      displayInSidebar: true,
      staffOnlyRoute: true,
    };

    expect(displayRoute(route)).toBeFalsy();
  });

  it('staff-only routes are not displayed if user is not staff in', () => {
    User.isLoggedIn = jest.fn(() => true);
    User.isStaff = jest.fn(() => false);

    const route = {
      displayInSidebar: true,
      staffOnlyRoute: true,
    };

    expect(displayRoute(route)).toBeFalsy();
  });

  it('staff-only routes are displayed if user is logged and and user is staff', () => {
    User.isLoggedIn = jest.fn(() => true);
    User.isStaff = jest.fn(() => true);

    const route = {
      displayInSidebar: true,
      staffOnlyRoute: true,
    };

    expect(displayRoute(route)).toBeTruthy();
  });

});
