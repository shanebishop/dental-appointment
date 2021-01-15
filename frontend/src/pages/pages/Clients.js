import React from 'react';
import store from "../../redux/store";
import {Redirect} from "react-router-dom";

import {
  Card, CardBody, CardHeader, CardTitle
} from "reactstrap";

import * as Actions from "../../redux/actions/clientsActions";
import ConfirmDialog from "../../components/ConfirmDialog";
import CustomTable from "../../components/CustomTable";

class Clients extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clients: [],
      errorFetchingClients: false,
      fetchingClients: true,

      dialog: {
        open: false,
        msg: '',
        title: '',
      }
    };

    this.fetchClientData = Actions.fetchClientData.bind(this);
  }

  clientTableColumns = [
    {
      dataField: 'username',
      text: 'Username'
    },
    {
      dataField: 'first_name',
      text: 'First Name'
    },
    {
      dataField: 'last_name',
      text: 'Surname'
    }
  ];

  // React best practices are to retrieve information from server
  // in componentDidMount() rather than the constructor
  componentDidMount() {
    this.fetchClientData();
  }

  render() {
    if (!store.getState().auth.loggedIn) {
      return <Redirect to={{ pathname: '/auth/sign-in', state: { from: window.location.pathname } }} />
    }

    if (this.state.fetchingClients) {
      return <p>Loading, please wait...</p>;
    } else if (this.state.errorFetchingClients) {
      return <p>Failed to load data. Try logging out and back in again.</p>;
    } else if (this.state.clients === []) {
      return <p>No clients have been registered yet.</p>
    }

    return (
      <React.Fragment>

        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">Clients</CardTitle>
          </CardHeader>
          <CardBody>
            <CustomTable
              id="clients-table"
              keyField="id"
              htmlIDKeyField="username"
              fieldPrefix="client"
              data={this.state.clients}
              columns={this.clientTableColumns}
            />
          </CardBody>
        </Card>

        {
          !this.state.dialog.open
            ? null
            : (
              <ConfirmDialog
                open={this.state.dialog.open}
                msg={this.state.dialog.msg}
                title={this.state.dialog.title}
                htmlName="client-page-dialog"
                msgHtmlName="client-page-dialog-msg"
                toggleOpenFn={this.toggleDialog}
              />
            )
        }

      </React.Fragment>
    );
  }
}

export default Clients;
