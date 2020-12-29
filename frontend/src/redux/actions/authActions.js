import * as types from "../constants";

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}
