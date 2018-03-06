import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { ExerciseConfirm } from './ExerciseConfirm';
import {
  exerciseCreate,
  exercisesFetch,
  benchmarkUpdate
} from '../actions';

class GlobalExerciseListItem extends Component {
  // Don't show the modal initially
  state = { showModal: false };

  onRowPress() {
    // When an exercise is selected, show the modal
    this.setState({ showModal: !this.state.showModal });
  }

  onAccept() {
    // When the user confirms that they want to add this exercise
    // Get the exercise name of the item selected, the clientUid, the workoutUid, and the value of the benchmark
    const { exerciseName } = this.props.globalExercise;
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    const { value } = this.props.benchmark;

    // Assign the value of the benchmark to a variable called benchmark
    const benchmark = value;

    // Create the exercise with the values above
    this.props.exerciseCreate({ exerciseName, benchmark, clientUid, workoutUid });

    // Get a list of all exercises for this workout
    this.props.exercisesFetch({ clientUid, workoutUid });

    // Hide the modal
    this.setState({ showModal: false });

    // Clear the benchmark value
    this.props.benchmarkUpdate({ value: '' });

    // Navigate the user to the workout detail screen
    Actions.workoutDetail();
  }

  onDecline() {
    // When the user cancells adding the exercise
    // Hide the modal
    this.setState({ showModal: false });

    // Clear the benchmark value
    this.props.benchmarkUpdate({ value: '' });
  }

  render() {
    const { exerciseName } = this.props.globalExercise;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {exerciseName}
            </Text>
          </CardSection>
          <ExerciseConfirm
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)}
              onDecline={this.onDecline.bind(this)}
              thisBenchmark={this.props.benchmark.value}
              onBenchmarkUpdate={value => this.props.benchmarkUpdate({ value })}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20
  }
};

const mapStateToProps = state => {
  return {
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    benchmark: state.benchmark
  };
};

export default connect(mapStateToProps, {
  exerciseCreate,
  exercisesFetch,
  benchmarkUpdate
})(GlobalExerciseListItem);
