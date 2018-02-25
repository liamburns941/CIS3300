import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ListView, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import {
  exercisesFetch,
  setUpdate,
  ratingChanged,
  exerciseSave,
  exerciseFetch,
  workoutComplete,
  workoutFetch,
  attemptsUpdate
} from '../actions';
import WorkoutReviewExerciseListItem from './WorkoutReviewExerciseListItem';
import { Card, CardSection, Button, Spinner } from './common';

class WorkoutReview extends Component {
  componentWillMount() {
    console.log(this.props);
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

  onRatingChange(text) {
    this.props.ratingChanged(text);
  }

  onCompleteButtonPress() {
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    this.props.workoutComplete({ clientUid, workoutUid });
  }

  onRedoButtonPress() {
    const { sets } = this.props.singleWorkout;

    this.props.setUpdate(sets);

    Actions.workoutWarmUp();
  }

  createDataSource({ exercises }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    return <WorkoutReviewExerciseListItem exercise={exercise} />;
  }

  renderCompleteButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onCompleteButtonPress.bind(this)}>
        Complete Workout
      </Button>
    );
  }

  render() {
    const { workoutName, exerciseTime, restTime, sets } = this.props.singleWorkout;

    const { attempts } = this.props;

    const { nameStyle, workoutTitleStyle, exerciseTitleStyle } = styles;

    let attemptsWording = null;

    if (attempts === 1) {
      attemptsWording = 'attempt';
    } else {
      attemptsWording = 'attempts';
    }

    const setsInt = parseInt(sets, 10);

    let setsWording = null;

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
            {this.renderCompleteButton()}
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
  statusTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    flex: 1,
    color: '#FFBF00'
  },
  exerciseTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  ratingStyle: {
    borderTopWidth: 20,
    borderBottomWidth: 20,
    flex: 1
  }
};

const mapStateToProps = state => {
  console.log(state);
  const exercises = _.map(state.exercises, (val, exerciseUid) => {
    return { ...val, exerciseUid };
  });

  return {
    exercises,
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    singleExercise: state.singleExercise,
    role: state.role,
    sets: state.sets,
    rating: state.rating,
    attempts: state.attempts
  };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  setUpdate,
  ratingChanged,
  exerciseSave,
  exerciseFetch,
  workoutComplete,
  workoutFetch,
  attemptsUpdate
})(WorkoutReview);
