import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CountdownCircle from 'react-native-countdown-circle';
import { exercisesFetch, setUpdate, exerciseNumberUpdate } from '../actions';
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

  onButtonPress() {
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
    const { sets, noOfExercises } = this.props;

    const { exerciseNumber } = this.props;

    const exerciseNumberPlusOne = exerciseNumber + 1;

    const { workoutName, restTime } = this.props.singleWorkout;

    const newSets = parseInt(sets, 10);

    const newrestTime = parseInt(restTime, 10);

    const { nameStyle, workoutTitleStyle } = styles;

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
          <CardSection style={{ alignItems: 'center', justifyContent: 'center' }}>
            <CountdownCircle
              seconds={newrestTime}
              radius={170}
              borderWidth={20}
              color="#ff003f"
              bgColor="#fff"
              textStyle={{ fontSize: 50 }}
              onTimeElapsed={() => {
                if (exerciseNumberPlusOne === noOfExercises) {
                  const newSetsMinusOne = newSets - 1;
                  if (newSetsMinusOne !== 0) {
                    this.props.setUpdate(newSetsMinusOne);
                    this.props.exerciseNumberUpdate(0);
                    Actions.workoutExerciseTimer();
                  } else {
                    this.props.setUpdate(newSetsMinusOne);
                    Actions.workoutCoolDown();
                  }
                } else {
                    this.props.exerciseNumberUpdate(exerciseNumberPlusOne);
                    Actions.workoutExerciseTimer();
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

        <Card>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Pause Workout
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
    noOfExercises: state.noOfExercises
  };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  setUpdate,
  exerciseNumberUpdate
})(WorkoutRestTimer);
