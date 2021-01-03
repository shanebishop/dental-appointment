import axios from 'axios';
import genBasicAuth from "../../utils/auth";

export function onSubmit(e) {
  e.preventDefault();

  if (this.state.password !== this.state.confirmPassword) {
    this.showErrorDialog('Passwords do not match.');
    return false; // Prevent triggering a submit action
  }

  const username = this.state.username;

  // All users get a temporary default password when they begin registration.
  // This is that password.
  const defaultPassword = 'PBEWjwj83b4HsM3GCxD7dXak9huLbq6H'

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${genBasicAuth(username, defaultPassword)}`,
    }
  };

  const data = {
    username,
    register_token: this.state.registerToken,
    password: this.state.password,
  };

  axios.post('/api/user/complete-registration/', data, config)
    .then((/*resp*/) => {
      window.location = '/auth/sign-in'; // Redirect to sign in page
    })
    .catch((err) => {
      this.showErrorDialog(err);
    });

  return false; // Prevent triggering a submit action
}

export function showSuccessDialog(msg) {
  this.setState({
    dialog: {
      open: true,
      msg: msg,
      title: 'Completed registration',
    }
  });
}

export function showErrorDialog(err) {
  const responseDataExists = err.response && err.response.data;
  let msg;

  if (responseDataExists && err.response.data.message) {
    msg = err.response.data.message;
  } else if (responseDataExists && err.response.data.detail) {
    msg = err.response.data.detail;
  } else {
    msg = `${err}`;
  }

  this.setState({
    dialog: {
      open: true,
      msg: msg,
      title: 'Failed to complete registration',
    }
  });
}

export function onUsernameChanged(e) {
  this.setState({username: e.target.value});
}

export function onRegisterTokenChanged(e) {
  this.setState({registerToken: e.target.value});
}

export function onPasswordChanged(e) {
  this.setState({password: e.target.value});
}

export function onConfirmPasswordChanged(e) {
  this.setState({confirmPassword: e.target.value});
}

export function toggleDialog() {
  this.setState({
    dialog: {
      ...this.state.dialog,
      open: !this.state.dialog.open
    }
  });
}

export function submitButtonEnabled() {
  return this.state.username && this.state.registerToken && this.state.password && this.state.confirmPassword;
}
