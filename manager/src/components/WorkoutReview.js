import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import {
  exercisesFetch,
  setUpdate,
  ratingChanged,
  workoutComplete
} from '../actions';
import WorkoutReviewExerciseListItem from './WorkoutReviewExerciseListItem';
import { Card, CardSection, Button } from './common';

class WorkoutReview extends Component {
  componentWillMount() {
    // Get the list of exercises for the workout
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

  onCompleteButtonPress() {
    // on completion of the workout, call the workout complete action for this workout
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    this.props.workoutComplete({ clientUid, workoutUid });
  }

  onRedoButtonPress() {
    // If the user wants to redo the workout, update the sets number to the original number for the workout
    const { sets } = this.props.singleWorkout;
    this.props.setUpdate(sets);

    // Navigate the user to the workout warmup screen
    Actions.workoutWarmUp();
  }

  createDataSource({ exercises }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    // For each exercise, create a list item
    return <WorkoutReviewExerciseListItem exercise={exercise} />;
  }

  render() {
    const { nameStyle, workoutTitleStyle, exerciseTitleStyle } = styles;
    const { workoutName, exerciseTime, restTime, sets } = this.props.singleWorkout;
    const { attempts } = this.props;
    const setsInt = parseInt(sets, 10);
    let attemptsWording = null;
    let setsWording = null;

    // Handling the wording for attempts
    if (attempts === 1) {
      attemptsWording = 'attempt';
    } else {
      attemptsWording = 'attempts';
    }

    // Handling the wording for sets
    if (setsInt === 1) {
      setsWording = 'set';
    } else {
      setsWording = 'sets';
    }

    return (
      <ScrollView>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-200}
          behavior="padding"
        >
          <Card>
          <Card>
            <CardSection>
              <Text style={nameStyle}>
                {workoutName}
              </Text>
            </CardSection>

            <CardSection>
              <Text style={workoutTitleStyle}>
                {exerciseTime} seconds work
              </Text>
              <Text style={workoutTitleStyle}>
                {sets} {setsWording}
              </Text>
            </CardSection>

            <CardSection>
              <Text style={workoutTitleStyle}>
                {restTime} seconds rest
              </Text>
              <Text style={workoutTitleStyle}>
                {attempts} {attemptsWording}
              </Text>
            </CardSection>
          </Card>

          <Card>
            <CardSection>
              <Text style={exerciseTitleStyle}>
              Exercises
              </Text>
            </CardSection>

            <CardSection>
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
              />
            </CardSection>

            <CardSection>
              <Button onPress={this.onCompleteButtonPress.bind(this)}>
                Complete Workout
              </Button>
            </CardSection>

            <CardSection>
              <Button onPress={this.onRedoButtonPress.bind(this)}>
                Redo Workout
              </Button>
            </CardSection>
          </Card>
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
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
  exerciseTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  }
};

const mapStateToProps = state => {
  const exercises = _.map(state.exercises, (val, exerciseUid) => {
    return { ...val, exerciseUid };
  });

  return {
    exercises,
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    sets: state.sets,
    rating: state.rating,
    attempts: state.attempts
  };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  setUpdate,
  ratingChanged,
  workoutComplete
})(WorkoutReview);
