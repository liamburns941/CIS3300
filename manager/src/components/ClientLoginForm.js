import _ from 'lodash';
import React, { Component } from 'react';
import { Text, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { clientsLookup, clientEmailChanged, clientFetch, clientLoginFail } from '../actions';
import { CardSection, Input, Button } from './common';

class ClientLoginForm extends Component {
  // When the email is changed, pass this value to the state
  onClientEmailChange(text) {
    this.props.clientEmailChanged(text);
  }

  onButtonPress() {
    const { clientAuthList, email } = this.props;

    // showError is listed as true
    // if the entered email matches a client, showError will be set to false so the error won't show
    let showError = true;

    // loop through each client
    for (const key in clientAuthList) {
      if (clientAuthList.hasOwnProperty(key)) {
        const thisClient = clientAuthList[key];
        const thisClientEmail = thisClient.email;

        // Check if the entered email matches a client email
        if (thisClientEmail === email) {
          // If there's a match, select this client, clear the email field, and move to the workout list
          this.props.clientFetch(thisClient);
          this.props.clientEmailChanged('');
          Actions.clientWorkoutList();
          showError = false;
          break;
        }
      }
    }

    // Show the error if none of the emails matched
    if (showError) {
      this.props.clientLoginFail();
    }
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
          <Button onPress={this.onButtonPress.bind(this)}>
            Login
          </Button>
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
  // Get the list of clients from the state and map them to props
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
