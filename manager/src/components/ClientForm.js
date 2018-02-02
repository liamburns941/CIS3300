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
            label="Name"
            placeholder="Enter client name"
            value={this.props.name}
            onChangeText={value => this.props.clientUpdate({ prop: 'name', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { name } = state.clientForm;

  return { name };
};

export default connect(mapStateToProps, { clientUpdate })(ClientForm);
