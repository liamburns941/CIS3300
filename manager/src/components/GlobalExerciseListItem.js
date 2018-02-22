import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection, Confirm } from './common';
import { exerciseUpdate, exerciseCreate, exerciseFetch, exercisesFetch } from '../actions';

class GlobalExerciseListItem extends Component {
  state = { showModal: false };

  onRowPress() {
    const { exerciseName } = this.props.globalExercise;
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    const { exercises } = this.props;

    const benchmark = '';

    if (exercises.length > 0) {
      const newExercise = exercises[exercises.length - 1];
      this.props.exerciseFetch(newExercise);
    } else {
      this.props.exerciseCreate({ exerciseName, benchmark, clientUid, workoutUid });
      this.props.exercisesFetch({ clientUid, workoutUid });
      //Actions.benchmark();
    }

    // need to somehow go back to mapStateToProps and then map the exercise and then call that to get the new exercise and set it as single exercise... then i can assign the benchmark to that

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
    //const { exercises } = this.props;
    //let newExercise = null;
    //if (exercises.length === 1 && newExercise == null) {
    //  newExercise = exercises[exercises.length - 1];
    //  this.props.exerciseFetch(newExercise);
    //}
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
              thisBenchmark={this.props.benchmark}
              onBenchmarkUpdate={value => this.props.exerciseUpdate({ prop: 'benchmark', value })}
          >
              What will the benchmark be per set?
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

export default connect(mapStateToProps, { exerciseUpdate, exerciseCreate, exerciseFetch, exercisesFetch })(GlobalExerciseListItem);
