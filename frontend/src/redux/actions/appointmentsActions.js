import axios from "axios";
import {authTokenAxiosConfig} from "../../utils/auth";

export function onAppointmentSelected(selectedAppointment) {
  this.setState({selectedAppointment});
}

export function onCancelClicked(appointment) {
  axios.delete(`/api/appointments/detail/${appointment.id}`, authTokenAxiosConfig())
    .then((resp) => {
      // TODO Need a dialog, and also need to refresh appointments list, and selected
      // appointment
    })
    .catch((err) => {

    });
}

export function onUpdateClicked(appointment) {
  // TODO
  console.log('TODO This will come later when I have created an update page');
}
