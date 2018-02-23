import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, Keyboard } from 'react-native';
import { exercisesFetch, setUpdate, workoutFetch, exerciseFetch } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class Benchmark extends Component {
  componentWillMount() {
    Keyboard.dismiss();
    const { singleExercise, exercises } = this.props;
    console.log(this.props);

    if (_.isEmpty(singleExercise)) {
      const newExercise = exercises[exercises.length - 1];
      this.props.exerciseFetch(newExercise);
    }
  }

  onButtonPress() {
    console.log(this.props);
  }

  render() {
    const {
      exerciseName
    } = this.props.singleExercise;

    const {
      workoutTitleStyle
    } = styles;

    return (
      <Card>
          <CardSection>
          <Text style={workoutTitleStyle}>
            Selected Exercise:
          </Text>
          <Text style={workoutTitleStyle}>
            {exerciseName}
          </Text>
          </CardSection>

          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
            Add Exercise
            </Button>
          </CardSection>

          <CardSection>
            <Input
              label="Benchmark"
              placeholder="Enter benchmark"
              value={this.props.benchmark}
              //onChangeText={value => console.log(value)}
            />
          </CardSection>
      </Card>
    );
  }
}

const styles = {
  nameStyle: {
    fontSize: 36,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  workoutTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    flex: 1
  },
  statusOutstandingTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    flex: 1,
    color: '#FFBF00'
  },
  statusCompletedTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    flex: 1,
    color: '#00FF00'
  },
  exerciseTitleStyle: {
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  exerciseSubTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  }
};

const mapStateToProps = state => {
  console.log(state);
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  const workouts = _.map(state.workouts, (val, workoutUid) => {
    return { ...val, workoutUid };
  });

  return {
    exercises,
    workouts,
    singleExercise: state.singleExercise,
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    role: state.role,
    sets: state.sets
  };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  setUpdate,
  workoutFetch,
  exerciseFetch
})(Benchmark);
