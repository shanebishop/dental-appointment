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

export function onClientClicked(client) {
  const config = authTokenAxiosConfig();

  axios.post('/api/user/profile/', {username: client.username}, config)
    .then((resp) => {
      const localClient = {...resp.data.user, ...resp.data.user_data};

      this.props.history.push({
        pathname: '/profile',
        state: {
          client: localClient
        },
        lastPage: window.location.pathname,
      });

    })
    .catch((err) => {
      this.showErrorDialog(err, 'Error');
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
