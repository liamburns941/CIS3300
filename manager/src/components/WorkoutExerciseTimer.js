import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CountdownCircle from 'react-native-countdown-circle';
import {
  setUpdate,
  exerciseNumberUpdate,
  noOfExercisesUpdate,
  workoutIsNotCancelledUpdate
} from '../actions';
import DuringWorkoutExerciseListItem from './DuringWorkoutExerciseListItem';
import { Card, CardSection, Button } from './common';

class WorkoutExerciseTimer extends Component {
  componentWillMount() {
    const { exercises } = this.props;
    const newNoOfExercises = exercises.length;

    this.props.noOfExercisesUpdate(newNoOfExercises);
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props
    this.createDataSource(nextProps);
  }

  onCancelButtonPress() {
    // If the workout is cancelled
    // Get the initial number of sets
    const { sets } = this.props.singleWorkout;

    // Update workoutIsNotCancelled to be false
    this.props.workoutIsNotCancelledUpdate(false);

    // Update the number of sets to the initial number
    this.props.setUpdate(sets);

    // Set the exercise number to be 0
    this.props.exerciseNumberUpdate(0);

    // Navigate the user to the client workout list
    Actions.clientWorkoutList();
  }

  createDataSource({ exercises }) {
    const { exerciseNumber } = this.props;

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    const singleExercise = [exercises[exerciseNumber]];

    this.dataSource = ds.cloneWithRows(singleExercise);
  }

  renderRow(exercise) {
    // For each exercise, create an exercise list item
    return <DuringWorkoutExerciseListItem exercise={exercise} />;
  }

  render() {
    const { nameStyle, workoutTitleStyle } = styles;
    const { workoutName, exerciseTime } = this.props.singleWorkout;
    const { sets, workoutIsNotCancelled } = this.props;
    const newSets = parseInt(sets, 10);
    const newExerciseTime = parseInt(exerciseTime, 10);

    // When the timer ends, check if the workout has been cancelled, if it hasn't navigate to workout rest timer
    return (
      <Card>
        <Card>
          <CardSection>
            <Text style={nameStyle}>
              {workoutName}
            </Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Button onPress={this.onCancelButtonPress.bind(this)}>
              Cancel Workout
            </Button>
          </CardSection>
        </Card>

        <Card>
          <CardSection style={{ alignItems: 'center', justifyContent: 'center' }}>
            <CountdownCircle
              seconds={newExerciseTime}
              radius={170}
              borderWidth={20}
              color="#00ff00"
              bgColor="#fff"
              textStyle={{ fontSize: 50 }}
              onTimeElapsed={() => {
                if (workoutIsNotCancelled) {
                  Actions.workoutRestTimer();
                }
              }
              }
            />
          </CardSection>
          <CardSection>
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Text style={workoutTitleStyle}>
              Sets left: {newSets}
            </Text>
          </CardSection>
        </Card>
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
};

const mapStateToProps = state => {
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  return {
    exercises,
    singleWorkout: state.singleWorkout,
    sets: state.sets,
    exerciseNumber: state.exerciseNumber,
    noOfExercises: state.noOfExercises,
    workoutIsNotCancelled: state.workoutIsNotCancelled
  };
};

export default connect(mapStateToProps, {
  setUpdate,
  exerciseNumberUpdate,
  noOfExercisesUpdate,
  workoutIsNotCancelledUpdate
})(WorkoutExerciseTimer);
