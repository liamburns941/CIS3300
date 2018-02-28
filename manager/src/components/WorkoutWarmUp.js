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

class WorkoutWarmUp extends Component {
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
    const { sets } = this.props.singleWorkout;
    this.props.workoutIsNotCancelledUpdate(false);
    this.props.setUpdate(sets);
    this.props.exerciseNumberUpdate(0);
    Actions.clientWorkoutList();
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
    const { nameStyle, workoutTitleStyle } = styles;
    const { workoutName } = this.props.singleWorkout;
    const { sets, workoutIsNotCancelled, workoutWarmUpTime } = this.props;
    const newSets = parseInt(sets, 10);

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
              seconds={workoutWarmUpTime}
              radius={170}
              borderWidth={20}
              color="#FFBF00"
              bgColor="#fff"
              textStyle={{ fontSize: 50 }}
              onTimeElapsed={() => {
                  if (workoutIsNotCancelled) {
                    Actions.workoutExerciseTimer();
                  }
                }
              }
            />
          </CardSection>
          <CardSection>
            <Text style={workoutTitleStyle}>
              Warm Up
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
    workoutIsNotCancelled: state.workoutIsNotCancelled,
    workoutWarmUpTime: state.workoutWarmUpTime
  };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  setUpdate,
  exerciseNumberUpdate,
  workoutIsNotCancelledUpdate
})(WorkoutWarmUp);
