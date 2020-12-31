/* global localStorage */

import axios from 'axios';

export function onSubmit(e) {
  e.preventDefault();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('user-token')}`,
    }
  };

  const username = this.state.username;

  // Copy this.state to data
  const data = {...this.state};
  delete data.dialog;

  axios.post('/api/user/register/', data, config)
    .then((/*resp*/) => {
      this.showSuccessDialog(`Registered ${username}.`);
    })
    .catch((err) => {
      this.showErrorDialog(err);
    });

  return false; // Prevent triggering a submit action
}

export function toggleDialog() {
  this.setState({
    dialog: {
      ...this.state.dialog,
      open: !this.state.dialog.open
    }
  });
}

export function showSuccessDialog(msg) {
  this.setState({
    dialog: {
      open: true,
      msg: msg,
      title: 'Registered',
    }
  });
}

export function showErrorDialog(err) {
  const msg = (err.response && err.response.data && err.response.data.message)
    ? err.response.data.message
    : `${err}`;

  this.setState({
    dialog: {
      open: true,
      msg: msg,
      title: 'Failed to register user',
    }
  });
}

export function onUsernameChanged(e) {
  this.setState({username: e.target.value});
}

export function onEmailChanged(e) {
  this.setState({email: e.target.value});
}

export function onFirstNameChanged(e) {
  this.setState({firstName: e.target.value});
}

export function onSurnameChanged(e) {
  this.setState({surname: e.target.value});
}

export function onAddress1Changed(e) {
  this.setState({address1: e.target.value});
}

export function onAddress2Changed(e) {
  this.setState({address2: e.target.value});
}

export function onCityChanged(e) {
  this.setState({city: e.target.value});
}

export function onProvinceChanged(e) {
  this.setState({province: e.target.value});
}

export function onPostalCodeChanged(e) {
  this.setState({postalCode: e.target.value});
}

export function registerButtonEnabled() {
  const reducer = (accumulator, currentValue) => accumulator && (currentValue !== '');
  return Object.values(this.state).reduce(reducer, true);
}
