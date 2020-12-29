/* global localStorage */

import axios from 'axios';

import { loginSuccess } from "./authActions";

export function toggleDialog() {
  this.setState(state => ({
    dialogOpen: !state.dialogOpen
  }));
}

export function showDialog(err) {
  let message;

  if (err.message && err.message === 'Request failed with status code 403') {
    message = 'Email or password is incorrect.';
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
    email: this.state.email,
    password: this.state.password
  }

  const url = '/api/auth/login/';

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${genBasicAuth(user)}`,
      // This csrf token header may not be necessary
      // if the frontend is configured properly with nginx
      'X-CSRFToken': getCookie('csrftoken'),
    }
  }

  axios.post(url, user, config)
    .then((resp) => {
      localStorage.setItem('user-token', resp.data.token);

      // TODO Will set user data better when there is an endpoint to get user data
      const userData = {};
      localStorage.setItem('user-data', JSON.stringify(userData));

      const { dispatch } = this.props;
      dispatch(loginSuccess(userData));
      this.props.history.push(this.state.redirectedFrom);
    })
    .catch((err) => {
      localStorage.removeItem('user-token');
      this.showDialog(err);
    });

  return false; // Prevent triggering a submit action
}

export function handleEmailChange(e) {
  this.setState({email: e.target.value});
}

export function handlePasswordChange(e) {
  this.setState({password: e.target.value});
}

export function signInButtonEnabled() {
  return this.state.email !== '' && this.state.password !== '';
}

// Private functions

function getCookie(name) {
  const re = new RegExp(`${name}=([^;]+)`);
  const value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}

function genBasicAuth({ email, password }) {
  return btoa(`${email}:${password}`)
}