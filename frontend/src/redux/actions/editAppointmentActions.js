/* globals localStorage */

import axios from 'axios';

export function updateValue(e) {
  this.setState({
    appointment: {
      ...this.state.appointment,
      [e.target.name]: e.target.value
    }
  });
}

export function updateClient(e) {
  this.setState({
    appointment: {
      ...this.state.appointment,
      client: {
        ...this.state.appointment.client,
        username: e.target.value
      }
    }
  });
}

export function updateOperation(e) {
  this.setState({
    appointment: {
      ...this.state.appointment,
      operation: e.target.value
    }
  });
}

export function onSubmit() {
  const data = {
    date: this.state.appointment.date,
    time: this.state.appointment.time,
    client: this.state.appointment.client.username,
    hygienist: this.state.appointment.hygienist,
    operation: this.state.appointment.operation,
    extra_notes: this.state.appointment.extra_notes,
  };

  if (this.state.appointment.id) {
    data.id = this.state.appointment.id;
  }

  const url = this.state.createMode
    ? '/api/appointments/list/'
    : `/api/appointments/detail/${this.state.appointment.id}/`;

  const config = {
    method: this.state.createMode ? 'post' : 'put',
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('user-token')}`,
    }
  };

  const updateCreateStr = this.state.createMode ? 'create' : 'update';

  axios(config)
    .then((/*resp*/) => {
      this.showSuccessDialog(`Appointment ${updateCreateStr}d.`, `Appointment ${updateCreateStr}d`);
    })
    .catch((err) => {
      this.showErrorDialog(err, `Failed to ${updateCreateStr} appointment`);
    })
}

export function showSuccessDialog(msg, title) {
  this.setState({
    dialog: {
      open: true,
      msg,
      title,
    }
  });
}

export function showErrorDialog(err, title) {
  const msg = (err.response && err.response.data && err.response.data.message)
    ? err.response.data.message
    : `${err}`;

  this.setState({
    dialog: {
      open: true,
      msg,
      title,
    }
  });
}

export function onCancel() {
  this.props.history.push('/'); // Go to homepage
}

export function submitButtonEnabled() {
  const appointment = this.state.appointment;

  // extra_notes is optional
  return appointment.date &&
    appointment.time &&
    appointment.client.username &&
    appointment.hygienist &&
    appointment.operation;
}

export function toggleDialog() {
  this.setState({
    dialog: {
      ...this.state.dialog,
      open: !this.state.dialog.open
    }
  });
}
