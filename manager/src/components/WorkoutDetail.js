import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { exercisesFetch, setUpdate, workoutFetch } from '../actions';
import ExerciseListItem from './ExerciseListItem';
import { Card, CardSection, Button } from './common';

class WorkoutDetail extends Component {
  componentWillMount() {
    Keyboard.dismiss();
    const { singleClient, singleWorkout, workouts } = this.props;

    if (_.isEmpty(singleWorkout)) {
      const newWorkout = workouts[workouts.length - 1];
      this.props.workoutFetch(newWorkout);
    }

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

  onStartWorkoutButtonPress() {
    const { sets } = this.props.singleWorkout;

    this.props.setUpdate(sets);

    Actions.workoutWarmUp();
  }

  onAddExerciseButtonPress() {
    Actions.globalExerciseList();
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
    const {
      workoutName,
      exerciseTime,
      restTime,
      sets,
      status,
      dateCompleted,
      attempts
    } = this.props.singleWorkout;

    const {
      nameStyle,
      workoutTitleStyle,
      statusOutstandingTitleStyle,
      statusCompletedTitleStyle,
      exerciseTitleStyle,
      exerciseSubTitleStyle
    } = styles;

    const { role } = this.props;

    let startWorkoutbutton = null;

    if (role === 'CLIENT' && status === 'Outstanding') {
       startWorkoutbutton =
       (<Card>
         <CardSection>
           <Button onPress={this.onStartWorkoutButtonPress.bind(this)}>
           Start Workout
           </Button>
         </CardSection>
       </Card>);
    }

    let addExerciseButton = null;

    if (status === 'ExercisesToBeAdded') {
      addExerciseButton =
      (<CardSection>
        <Button onPress={this.onAddExerciseButtonPress.bind(this)}>
        Add Exercise To Workout
        </Button>
      </CardSection>);
    }

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

    let completedRow = null;
    let ratingHeader = null;
    let stylingToUse = statusOutstandingTitleStyle;

    if (status === 'Completed') {
      completedRow =
        (
          <CardSection>
          <Text style={workoutTitleStyle}>
            {dateCompleted}
          </Text>
          <Text style={workoutTitleStyle}>
            {attempts} {attemptsWording}
          </Text>
          </CardSection>
        );
      ratingHeader =
        (
          <Text style={exerciseSubTitleStyle}>
            Rating
          </Text>
        );
      stylingToUse = statusCompletedTitleStyle;
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
          <Text style={stylingToUse}>
            {status}
          </Text>
          </CardSection>

          <CardSection>
          <Text style={workoutTitleStyle}>
            {restTime} seconds rest
          </Text>
          <Text style={workoutTitleStyle}>
            {sets} {setsWording}
          </Text>
          </CardSection>

          {completedRow}
        </Card>

        <Card>
          <CardSection>
            <Text style={exerciseTitleStyle}>
            Exercises
            </Text>
          </CardSection>

          {addExerciseButton}

          <CardSection>
            <Text style={exerciseSubTitleStyle}>
            Name
            </Text>
            <Text style={exerciseSubTitleStyle}>
            Benchmark
            </Text>
            {ratingHeader}
          </CardSection>

          <CardSection>
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
          </CardSection>
        </Card>

        {startWorkoutbutton}

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
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  const workouts = _.map(state.workouts, (val, workoutUid) => {
    return { ...val, workoutUid };
  });

  return {
    exercises,
    workouts,
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    role: state.role,
    sets: state.sets
  };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  setUpdate,
  workoutFetch
})(WorkoutDetail);
