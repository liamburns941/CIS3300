import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser, clientsLookup, roleUpdate } from '../actions';
import { CardSection, Button, Spinner, Card } from './common';

class RoleChoice extends Component {
  componentWillMount() {
    this.props.clientsLookup();
  }

  onPTButtonPress() {
    this.props.roleUpdate('PT');
    Actions.ptLogin();
  }

  onClientButtonPress() {
    this.props.roleUpdate('CLIENT');
    Actions.clientLogin();
  }

  renderPTButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onPTButtonPress.bind(this)}>
        Personal Trainer
      </Button>
    );
  }

  renderClientButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onClientButtonPress.bind(this)}>
        Client
      </Button>
    );
  }

  render() {
    return (
    <Card>
      <CardSection style={styles.cardSectionStyle}>
          {this.renderPTButton()}
      </CardSection>
      <CardSection style={styles.cardSectionStyle}>
          {this.renderClientButton()}
      </CardSection>
    </Card>
    );
  }
}

const styles = {
  cardSectionStyle: {
    padding: 50
  }
};

export default connect(null, {
  emailChanged, passwordChanged, loginUser, clientsLookup, roleUpdate
})(RoleChoice);
