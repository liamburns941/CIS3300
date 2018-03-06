import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CountdownCircle from 'react-native-countdown-circle';
import {
  exercisesFetch,
  setUpdate,
  exerciseNumberUpdate,
  workoutIsNotCancelledUpdate
} from '../actions';
import ExerciseListItem from './ExerciseListItem';
import { Card, CardSection, Button } from './common';

class WorkoutRestTimer extends Component {
  componentWillMount() {
    const { singleClient, singleWorkout } = this.props;
    this.props.exercisesFetch({
      clientUid: singleClient.clientUid,
      workoutUid: singleWorkout.workoutUid
    });
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
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    // For each exercise, create an exercise list item
    return <ExerciseListItem exercise={exercise} />;
  }

  render() {
    const { nameStyle, workoutTitleStyle } = styles;
    const { sets, noOfExercises, exerciseNumber, workoutIsNotCancelled } = this.props;
    const exerciseNumberPlusOne = exerciseNumber + 1;
    const { workoutName, restTime } = this.props.singleWorkout;
    const newSets = parseInt(sets, 10);
    const newrestTime = parseInt(restTime, 10);

    // When the timer ends, check if the workout has been cancelled, if it hasn't then check the other conditions
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
              seconds={newrestTime}
              radius={170}
              borderWidth={20}
              color="#ff003f"
              bgColor="#fff"
              textStyle={{ fontSize: 50 }}
              onTimeElapsed={() => {
                  if (workoutIsNotCancelled) {
                    // if the workout hasn't been cancelled, check if the exercise number is the last exercise
                    if (exerciseNumberPlusOne === noOfExercises) {
                      // if the exercise number is the last exercise,
                      const newSetsMinusOne = newSets - 1;
                      if (newSetsMinusOne !== 0) {
                        // If newSetsMinusOne doesn't = 0, there are more sets
                        // Update the number of sets
                        this.props.setUpdate(newSetsMinusOne);

                        // Update the exercise number to be 0
                        this.props.exerciseNumberUpdate(0);

                        // Navigate the user to the exercise timer
                        Actions.workoutExerciseTimer();
                      } else {
                        // If newSetsMinusOne = 0, there are no more sets
                        // Update the number of sets
                        this.props.setUpdate(newSets);

                        // Navigate the user to the workout cooldown
                        Actions.workoutCoolDown();
                      }
                    } else {
                        // if the exercise number is not the last exercise, update the exercise number to the next one
                        this.props.exerciseNumberUpdate(exerciseNumberPlusOne);

                        // Navigate the user to the exercise time
                        Actions.workoutExerciseTimer();
                    }
                  }
                }
              }
            />
          </CardSection>
          <CardSection>
          <Text style={workoutTitleStyle}>
            Rest Time
          </Text>
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
  }
};

const mapStateToProps = state => {
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  return {
    exercises,
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    sets: state.sets,
    exerciseNumber: state.exerciseNumber,
    noOfExercises: state.noOfExercises,
    workoutIsNotCancelled: state.workoutIsNotCancelled
  };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  setUpdate,
  exerciseNumberUpdate,
  workoutIsNotCancelledUpdate
})(WorkoutRestTimer);
