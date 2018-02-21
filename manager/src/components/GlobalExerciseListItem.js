import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Confirm } from './common';
import { clientFetch, exerciseUpdate, exerciseCreate, exerciseFetch, exercisesFetch } from '../actions';

class GlobalExerciseListItem extends Component {
  state = { showModal: false };
  onRowPress() {
    console.log(this.props.globalExercise.exerciseName);
    console.log('global exercises');

    const { exerciseName } = this.props.globalExercise;
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    const { exercises } = this.props;

    const benchmark = '';

    debugger;
    console.log(exercises);

    if (exercises.length > 0) {
      const newExercise = exercises[exercises.length - 1];
      this.props.exerciseFetch(newExercise);
    } else {
      this.props.exerciseCreate({ exerciseName, benchmark, clientUid, workoutUid });
      this.props.exercisesFetch({ clientUid, workoutUid });
    }

    debugger;

    this.setState({ showModal: !this.state.showModal });
  }

  onAccept() {
    //this.setState({ showModal: false });
    console.log(this.props);
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    console.log(this.props);

    const { exerciseName } = this.props.globalExercise;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {exerciseName}
            </Text>
          </CardSection>
          <Confirm
              visible={this.state.showModal}
              onAccept={this.onAccept.bind(this)}
              onDecline={this.onDecline.bind(this)}
              thisBenchmark={this.props.singleExercise.benchmark}
              onBenchmarkUpdate={value => this.props.exerciseUpdate({ prop: 'benchmark', value })}
          >
              What will the benchmark for this exercise be per set?
          </Confirm>
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
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  return {
    exercises,
    singleWorkout: state.singleWorkout,
    singleExercise: state.singleExercise,
    singleClient: state.singleClient,
    role: state.role,
    sets: state.sets
  };
};

export default connect(mapStateToProps, { clientFetch, exerciseUpdate, exerciseCreate, exerciseFetch, exercisesFetch })(GlobalExerciseListItem);
