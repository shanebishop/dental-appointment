/* global localStorage */

import * as types from "../constants";

const initialState = {
  // WARNING This is an insecure check
  loggedIn: localStorage.getItem('user-token') !== null && localStorage.getItem('user-token') !== '',

  userData: localStorage.getItem('user-data'),
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        userData: action.payload,
      };

    case types.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userData: null,
      };

    default:
      return state;
  }
}
