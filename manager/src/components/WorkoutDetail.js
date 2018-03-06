import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  exercisesFetch,
  setUpdate,
  workoutFetch,
  workoutSave,
  workoutIsNotCancelledUpdate
} from '../actions';
import ExerciseListItem from './ExerciseListItem';
import { Card, CardSection, Button } from './common';

class WorkoutDetail extends Component {
  componentWillMount() {
    // Dismiss the keyboard if it is open
    Keyboard.dismiss();

    // Get the selected client, selected workout and the list of workouts
    const { singleClient, singleWorkout, workouts } = this.props;

    if (_.isEmpty(singleWorkout)) {
      // If there isn't any selected workout, select the last workout and pass them in as the selected workout
      const newWorkout = workouts[workouts.length - 1];
      this.props.workoutFetch(newWorkout);
    }

    // Get the exercises for the selected workout
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
    // Get the number of sets for the workout
    const { sets } = this.props.singleWorkout;

    // Confirm that the workout is not cancelled
    this.props.workoutIsNotCancelledUpdate(true);

    // Pass the number of sets for the workout
    this.props.setUpdate(sets);

    // Navigate the user to the workout warm up screen
    Actions.workoutWarmUp();
  }

  onSaveWorkoutButtonPress() {
    // Save the current workout in firebase
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    this.props.workoutSave({ clientUid, workoutUid });
  }

  onAddExerciseButtonPress() {
    // If the user selects to add an exercise, navigate the user to the global exercise list screen
    Actions.globalExerciseList();
  }

  createDataSource({ exercises }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    // For each exercise, create a list item
    return <ExerciseListItem exercise={exercise} />;
  }

  render() {
    const {
      nameStyle,
      workoutTitleStyle,
      statusOutstandingTitleStyle,
      statusCompletedTitleStyle,
      exerciseTitleStyle,
      exerciseSubTitleStyle
    } = styles;

    const {
      workoutName,
      exerciseTime,
      restTime,
      sets,
      status,
      dateCompleted,
      attempts
    } = this.props.singleWorkout;

    const { exercises, role } = this.props;
    const setsInt = parseInt(sets, 10);

    let statusToShow = status;
    let stylingToUse = statusOutstandingTitleStyle;
    let setsWording = null;
    let startWorkoutbutton = null;
    let saveWorkoutbutton = null;
    let addExerciseButton = null;
    let attemptsWording = null;
    let completedRow = null;
    let ratingHeader = null;
    let noExercises = null;

    // Only show the start workout button if the user is a client and the workout status is Outstanding
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

    // Only show the save workout button and the list of exercises
    // if the user is a PT and the workout hasn't been created fully yet, and there's at least one exercise
    if (role === 'PT' && status === 'ExercisesToBeAdded' && exercises.length > 0) {
       saveWorkoutbutton =
       (<Card>
         <CardSection>
           <Button onPress={this.onSaveWorkoutButtonPress.bind(this)}>
           Save Workout
           </Button>
         </CardSection>
       </Card>);

       noExercises =
       (<CardSection>
         <Text style={exerciseSubTitleStyle}>
         Name
         </Text>
         <Text style={exerciseSubTitleStyle}>
         Benchmark
         </Text>
         {ratingHeader}
       </CardSection>);
    }

    // Only show the add exercuse button if the workout hasn't been created fully
    if (status === 'ExercisesToBeAdded') {
      addExerciseButton =
      (<CardSection>
        <Button onPress={this.onAddExerciseButtonPress.bind(this)}>
        Add Exercise To Workout
        </Button>
      </CardSection>);
      statusToShow = 'Outstanding';
    }

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

    // Only show the completed row if the workout status is completed
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
              <Text style={stylingToUse}>
                {statusToShow}
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

            {noExercises}

            <CardSection>
              <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
              />
            </CardSection>
          </Card>

          {startWorkoutbutton}

          {saveWorkoutbutton}
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
  workoutFetch,
  workoutSave,
  workoutIsNotCancelledUpdate
})(WorkoutDetail);
