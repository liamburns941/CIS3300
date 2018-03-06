import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { clientsFetch, clientCreate } from '../actions';
import ClientListItem from './ClientListItem';
import { Card, CardSection, Button } from './common';

class ClientList extends Component {
  componentWillMount() {
    // Get a list of all clients for this user
    this.props.clientsFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  onButtonPress() {
    Actions.clientCreate();
  }

  createDataSource({ clients }) {
    // Create a dataSource of the list of clients
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(clients);
  }

  renderRow(client) {
    // For each client create a ClientListItem
    return <ClientListItem client={client} />;
  }

  render() {
    const { titleStyle } = styles;

    const { clients } = this.props;

    let noClients = null;
    if (clients.length === 0) {
      noClients =
      (<Text style={titleStyle}>
        No Clients
      </Text>);
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-200}
          behavior="padding"
        >
          <Card>
            <CardSection>
              <Button onPress={this.onButtonPress.bind(this)}>
                Create Client
              </Button>
            </CardSection>
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
            {noClients}
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  // Get the list of clients from the state and map them to props
  const clients = _.map(state.clients, (val, clientUid) => {
    return { ...val, clientUid };
  });
  return { clients };
};

export default connect(mapStateToProps, { clientsFetch, clientCreate })(ClientList);
