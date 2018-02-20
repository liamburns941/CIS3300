import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import {
  exercisesFetch,
  setUpdate,
  ratingChanged,
  exerciseSave,
  exerciseFetch,
  workoutComplete
} from '../actions';
import ExerciseListItem from './ExerciseListItem';
import { Card, CardSection, Button, Input } from './common';

class WorkoutReview extends Component {
  componentWillMount() {
    const { singleClient, singleWorkout } = this.props;
    this.props.exercisesFetch({
      clientUid: singleClient.clientUid,
      workoutUid: singleWorkout.workoutUid
    });
    this.props.exerciseFetch(this.props.exercises[0]);

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

  onButtonPress() {
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    const { exerciseUid } = this.props.singleExercise;
    const { rating } = this.props.rating;
    this.props.exerciseSave({ clientUid, workoutUid, exerciseUid, rating });
    this.props.workoutComplete({ clientUid, workoutUid });
  }

  createDataSource({ exercises }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    return <ExerciseListItem exercise={exercise} />;
  }

  render() {
    const { workoutName, exerciseTime, restTime, sets, attempts } = this.props.singleWorkout;

    const { nameStyle, workoutTitleStyle, exerciseTitleStyle, ratingStyle } = styles;

    const attemptsPlusOne = parseInt(attempts, 10) + 1;

    let attemptsWording = null;

    if (attemptsPlusOne === 1) {
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
              {attemptsPlusOne} {attemptsWording}
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
            <Input
              style={ratingStyle}
              placeholder="Enter rating"
              onChangeText={this.onRatingChange.bind(this)}
              value={this.props.rating.rating}
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Complete
            </Button>
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
  console.log(state.exercises);
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
    rating: state.rating
  };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  setUpdate,
  ratingChanged,
  exerciseSave,
  exerciseFetch,
  workoutComplete
})(WorkoutReview);
