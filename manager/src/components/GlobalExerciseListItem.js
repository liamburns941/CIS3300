import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Confirm } from './common';
import {
  exerciseUpdate,
  exerciseCreate,
  exerciseFetch,
  exercisesFetch,
  benchmarkUpdate
} from '../actions';

class GlobalExerciseListItem extends Component {
  state = { showModal: false };

  onRowPress() {
    this.setState({ showModal: !this.state.showModal });
  }

  onAccept() {
    const { exerciseName } = this.props.globalExercise;
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    const { value } = this.props.benchmark;

    const benchmark = value;

    this.props.exerciseCreate({ exerciseName, benchmark, clientUid, workoutUid });
    this.props.exercisesFetch({ clientUid, workoutUid });
    this.setState({ showModal: false });
    this.props.benchmarkUpdate({ value: '' });
    Actions.workoutDetail();
  }

  onDecline() {
    console.log(this.props);
    this.setState({ showModal: false });
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
          <Confirm
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
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  return {
    exercises,
    singleWorkout: state.singleWorkout,
    singleExercise: state.singleExercise,
    singleClient: state.singleClient,
    role: state.role,
    sets: state.sets,
    benchmark: state.benchmark
  };
};

export default connect(mapStateToProps, {
  exerciseUpdate,
  exerciseCreate,
  exerciseFetch,
  exercisesFetch,
  benchmarkUpdate
})(GlobalExerciseListItem);
