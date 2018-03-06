import React, { Component } from 'react';
import { Text, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { CardSection, Input, Button, Spinner } from './common';

class PTLoginForm extends Component {
  // When the email is changed, pass this value to the state
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  // When the password is changed, pass this value to the state
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  // On button press, log in the user user with the email and password
  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    // If the page is loading, show the spinner, otherwise show the button
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
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="Enter password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
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

const mapStateToProps = ({ ptAuth }) => {
  const { email, password, error, loading } = ptAuth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(PTLoginForm);
