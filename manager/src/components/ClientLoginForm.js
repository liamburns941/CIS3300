import _ from 'lodash';
import React, { Component } from 'react';
import { Text, Image, KeyboardAvoidingView, ScrollView, ListView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { clientsLookup, clientEmailChanged, clientFetch, clientLoginFail } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';

class ClientLoginForm extends Component {
  onClientEmailChange(text) {
    this.props.clientEmailChanged(text);
  }

  onButtonPress() {
    const { clientAuthList, email } = this.props;

    let showError = true;

    for (const key in clientAuthList) {
      if (clientAuthList.hasOwnProperty(key)) {
        const thisClient = clientAuthList[key];
        const thisClientEmail = thisClient.email;

        if (thisClientEmail === email) {
          this.props.clientFetch(thisClient);
          Actions.clientWorkoutList();
          showError = false;
          break;
        }
      }
    }

    if (showError) {
      this.props.clientLoginFail();
    }
  }

  createDataSource({ clientAuth }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(clientAuth);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    return (
    <ScrollView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={-200}
        behavior="padding"
      >
        <CardSection>
          <Image
            source={require('./images/CIS3300_Login_Icon.png')}
               style={{
                 height: 300,
                 flex: 1,
                 width: null
               }}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder="Enter email"
            onChangeText={this.onClientEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </KeyboardAvoidingView>
    </ScrollView>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = state => {
  const clientAuthList = _.map(state.clientAuthList, (val, clientUid) => {
    return { ...val, clientUid };
  });

  const { email, error } = state.clientAuth;
  return { clientAuthList, email, error };
};

export default connect(mapStateToProps, {
  clientsLookup,
  clientEmailChanged,
  clientFetch,
  clientLoginFail
})(ClientLoginForm);
