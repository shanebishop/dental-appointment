import axios from 'axios';
import {authTokenAxiosConfig} from "../../utils/auth";

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
  const config = authTokenAxiosConfig();

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

  console.log(data);

  axios.post('/api/appointments/list/', data, config)
    .then((resp) => {
      console.log('TODO Handle success');
      console.log(resp);
    })
    .catch((err) => {
      console.log('TODO Handle error');
      console.log(err);
      console.log(err.response.data);
    })
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
