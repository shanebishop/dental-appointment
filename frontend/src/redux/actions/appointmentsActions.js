import axios from "axios";
import {authTokenAxiosConfig} from "../../utils/auth";

export function onAppointmentSelected(selectedAppointment) {
  this.setState({selectedAppointment});
}

export function onCancelClicked(appointment) {
  axios.delete(`/api/appointments/detail/${appointment.id}`, authTokenAxiosConfig())
    .then((/*resp*/) => {
      this.refreshData();
      this.showSuccessDialog('Appointment cancelled.', 'Appointment cancelled');
    })
    .catch((err) => {
      this.showErrorDialog(err, 'Failed to cancel appointment');
    });
}

export function refreshData() {
  const config = authTokenAxiosConfig();

  axios.get('/api/appointments/list/', config)
    .then((resp) => {
      this.setState({
        appointments: resp.data,
        fetchingAppointments: false,
        selectedAppointment: null,
      });
    })
    .catch(() => {
      this.setState({
        errorFetchingAppointments: true,
        fetchingAppointments: false,
        selectedAppointment: null,
      });
    });
}

export function onUpdateClicked(appointment) {
  // TODO
  console.log('TODO This will come later when I have created an update page');
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

export function toggleDialog() {
  this.setState({
    dialog: {
      ...this.state.dialog,
      open: !this.state.dialog.open
    }
  });
}
