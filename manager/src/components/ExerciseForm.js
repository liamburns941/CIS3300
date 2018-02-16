import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { exerciseUpdate } from '../actions';
import { CardSection, Input } from './common';

class ExerciseForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Enter exercise name"
            value={this.props.exerciseName}
            onChangeText={value => this.props.exerciseUpdate({ prop: 'exerciseName', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Benchmark"
            placeholder="Enter exercise benchmark"
            value={this.props.benchmark}
            onChangeText={value => this.props.exerciseUpdate({ prop: 'benchmark', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { exerciseName, benchmark } = state.exerciseForm;

  return { exerciseName, benchmark };
};

export default connect(mapStateToProps, { exerciseUpdate })(ExerciseForm);
