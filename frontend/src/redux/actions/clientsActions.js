import axios from "axios";
import {authTokenAxiosConfig} from "../../utils/auth";

export function fetchClientData() {
  const config = authTokenAxiosConfig();

  axios.get('/api/user/all/', config)
    .then((resp) => {
      this.setState({
        clients: resp.data.users.filter(u => !u.is_staff),
        fetchingClients: false,
      })
    })
    .catch((/*err*/) => {
      this.setState({
        errorFetchingClients: true,
        fetchingClients: false,
      });
    });
}
