import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { clientUpdate } from '../actions';
import { CardSection, Input } from './common';

class ClientForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="First Name"
            placeholder="Enter client first name"
            value={this.props.firstName}
            onChangeText={value => this.props.clientUpdate({ prop: 'firstName', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last Name"
            placeholder="Enter client last name"
            value={this.props.lastName}
            onChangeText={value => this.props.clientUpdate({ prop: 'lastName', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder="Enter client email"
            value={this.props.email}
            onChangeText={value => this.props.clientUpdate({ prop: 'email', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { firstName, lastName, email } = state.clientForm;

  return { firstName, lastName, email };
};

export default connect(mapStateToProps, { clientUpdate })(ClientForm);
