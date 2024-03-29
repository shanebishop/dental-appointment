/* global localStorage */

import axios from 'axios';

import { loginSuccess } from "./authActions";
import {basicAuthAxiosConfig} from "../../utils/auth";

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
  const config = basicAuthAxiosConfig(this.state.username, this.state.password);

  axios.post(url, user, config)
    .then((resp) => {
      localStorage.setItem('user-token', resp.data.token);

      axios.post('/api/user/profile/', {username: this.state.username}, config)
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
