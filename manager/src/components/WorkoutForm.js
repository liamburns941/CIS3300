import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { workoutUpdate } from '../actions';
import { CardSection, Input } from './common';

class WorkoutForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Enter workout name"
            value={this.props.name}
            onChangeText={value => this.props.workoutUpdate({ prop: 'name', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name } = state.workoutForm;

  return { name };
};

export default connect(mapStateToProps, { workoutUpdate })(WorkoutForm);
