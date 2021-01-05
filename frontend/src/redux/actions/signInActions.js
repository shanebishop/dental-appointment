/* global localStorage */

import axios from 'axios';

import { loginSuccess } from "./authActions";
import getCookie from "../../utils/getCookie";
import genBasicAuth from "../../utils/auth";

export function toggleDialog() {
  this.setState(state => ({
    dialogOpen: !state.dialogOpen
  }));
}

export function showDialog(err) {
  let message;

  if (err.message && err.message === 'Request failed with status code 403') {
    message = 'Username or password is incorrect.';
  } else {
    message = `Error: ${err}`;
  }

  this.setState({
    dialogOpen: true,
    dialogMsg: message,
  })
}

export function login(e) {
  e.preventDefault();

  const user = {
    // knox expects email as the key
    email: this.state.username,
    password: this.state.password
  };

  const url = '/api/auth/login/';

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${genBasicAuth(this.state.username, this.state.password)}`,
      // This csrf token header may not be necessary
      // if the frontend is configured properly with nginx
      'X-CSRFToken': getCookie('csrftoken'),
    }
  };

  axios.post(url, user, config)
    .then((resp) => {
      localStorage.setItem('user-token', resp.data.token);

      axios.get('/api/user/profile/', config)
        .then((resp) => {
          const userData = resp.data;
          localStorage.setItem('user-data', JSON.stringify(userData));

          const { dispatch } = this.props;
          dispatch(loginSuccess(userData));
          this.props.history.push(this.state.redirectedFrom);
        })
        .catch((err) => {
          this.showDialog(err);
        });

    })
    .catch((err) => {
      this.showDialog(err);
    });

  return false; // Prevent triggering a submit action
}

export function handleUsernameChange(e) {
  this.setState({username: e.target.value});
}

export function handlePasswordChange(e) {
  this.setState({password: e.target.value});
}

export function signInButtonEnabled() {
  return this.state.username !== '' && this.state.password !== '';
}
