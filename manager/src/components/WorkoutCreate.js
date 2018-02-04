import React, { Component } from 'react';
import { connect } from 'react-redux';
import { workoutUpdate, workoutCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import WorkoutForm from './WorkoutForm';
import { Text } from 'react-native';

class WorkoutCreate extends Component {

  onCreateWorkoutButtonPress() {
    const { name, exerciseTime, restTime, sets } = this.props;
    this.props.workoutCreate({ name, exerciseTime, restTime, sets, uid:this.props.uid });
  }

  onAddExerciseButtonPress() {

  }

  render() {

    const { titleStyle } = styles;

    return (
      <Card>
        <Text style={titleStyle}>
        Workout Details
        </Text>
        <WorkoutForm {...this.props} />
        <Text style={titleStyle}>
        Workout Exercises
        </Text>
        <CardSection>
          <Button onPress={this.onAddExerciseButtonPress.bind(this)}>
            Add Exercise
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onCreateWorkoutButtonPress.bind(this)}>
            Create Workout
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  }
};

const mapStateToProps = (state) => {
  const { name, exerciseTime, restTime, sets, client } = state.workoutForm;

  return { name, exerciseTime, restTime, sets, client };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutCreate
})(WorkoutCreate);
