/* global localStorage */

import axios from 'axios';

export function onSubmit(e) {
  e.preventDefault();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('user-token')}`,
      // TODO Do I need the X-CSRFToken as well?
      // 'X-CSRFToken': getCookie('csrftoken'),
    }
  };

  const username = this.state.username;

  // Copy this.state to data
  const data = {...this.state};

  axios.post('/api/user/register/', data, config)
    .then((/*resp*/) => {
      // TODO Need to figure out how to show info versus error dialog
      console.log('Request succeeded');
      // this.showDialog(`Registered ${username}.`);
    })
    .catch((err) => {
      // TODO
      console.log('Request failed');
      console.log(err);
      console.log(err.response);
      // this.showDialog(err);
    });

  return false; // Prevent triggering a submit action
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

// Private functions

function getCookie(name) {
  const re = new RegExp(`${name}=([^;]+)`);
  const value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : null;
}
