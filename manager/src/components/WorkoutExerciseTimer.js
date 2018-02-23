import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CountdownCircle from 'react-native-countdown-circle';
import { exercisesFetch, setUpdate, exerciseNumberUpdate, noOfExercisesUpdate } from '../actions';
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

  onButtonPress() {

  }

  createDataSource({ exercises }) {
    const { exerciseNumber } = this.props;

    console.log('exerciseNumber');
    console.log(exerciseNumber);

    console.log('this.props');
    console.log(this.props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    console.log('exerciseNumber');
    console.log(exerciseNumber);
    console.log('exercises');
    console.log(exercises);
    console.log('[exercises[exerciseNumber]]');
    console.log([exercises[exerciseNumber]]);
    const singleExercise = [exercises[exerciseNumber]];
    console.log('singleExercise');
    console.log(singleExercise);

    this.dataSource = ds.cloneWithRows(singleExercise);
  }

  renderRow(exercise) {
    return <DuringWorkoutExerciseListItem exercise={exercise} />;
  }

  render() {
    const { workoutName, exerciseTime } = this.props.singleWorkout;

    const { sets } = this.props;

    const newSets = parseInt(sets, 10);

    const newExerciseTime = parseInt(exerciseTime, 10);

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
              seconds={newExerciseTime}
              radius={170}
              borderWidth={20}
              color="#00ff00"
              bgColor="#fff"
              textStyle={{ fontSize: 50 }}
              onTimeElapsed={() => Actions.workoutRestTimer()}
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
  console.log('WorkoutExerciseTimer state');
  console.log(state);
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
  exerciseNumberUpdate,
  noOfExercisesUpdate
})(WorkoutExerciseTimer);
