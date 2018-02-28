import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { clientsLookup, roleUpdate } from '../actions';
import { CardSection, Button, Card } from './common';

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

  render() {
    return (
    <Card>
      <CardSection style={styles.cardSectionStyle}>
        <Button onPress={this.onPTButtonPress.bind(this)}>
          Personal Trainer
        </Button>
      </CardSection>
      <CardSection style={styles.cardSectionStyle}>
        <Button onPress={this.onClientButtonPress.bind(this)}>
          Client
        </Button>
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
  clientsLookup, roleUpdate
})(RoleChoice);
