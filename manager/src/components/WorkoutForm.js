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
        <CardSection>
          <Input
            label="Exercise time"
            placeholder="Enter exercise time (s)"
            value={this.props.exerciseTime}
            onChangeText={value => this.props.workoutUpdate({ prop: 'exerciseTime', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Rest time"
            placeholder="Enter rest time (s)"
            value={this.props.restTime}
            onChangeText={value => this.props.workoutUpdate({ prop: 'restTime', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Sets"
            placeholder="Enter number of sets"
            value={this.props.sets}
            onChangeText={value => this.props.workoutUpdate({ prop: 'sets', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, exerciseTime, restTime, sets } = state.workoutForm;

  return { name, exerciseTime, restTime, sets };
};

export default connect(mapStateToProps, { workoutUpdate })(WorkoutForm);
