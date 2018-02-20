import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { exerciseUpdate, globalExercisesFetch } from '../actions';
import { CardSection, Input } from './common';

class ExerciseForm extends Component {
  componentWillMount() {
    this.props.globalExercisesFetch();
  }
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
  console.log(state);
  const { exerciseName, benchmark } = state.exerciseForm;

  const globalExercises = _.map(state.globalExercises, (val, exerciseId) => {
    return { ...val, exerciseId };
  });

  console.log(globalExercises);

  return { exerciseName, benchmark, globalExercises };
};

export default connect(mapStateToProps, { exerciseUpdate, globalExercisesFetch })(ExerciseForm);
