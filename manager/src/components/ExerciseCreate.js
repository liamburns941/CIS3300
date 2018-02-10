import React, { Component } from 'react';
import { connect } from 'react-redux';
import { exerciseUpdate, exerciseCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ExerciseForm from './ExerciseForm';
import { Text } from 'react-native';

class ExerciseCreate extends Component {

  onCreateWorkoutButtonPress() {
    const { exerciseName, benchmark, clientUid, workoutUid } = this.props;
    this.props.exerciseCreate({ exerciseName, benchmark, clientUid, workoutUid });
  }

  render() {
    const { titleStyle } = styles;

    return (
      <Card>
        <Text style={titleStyle}>
        Step 2: Exercise Details
        </Text>
        <ExerciseForm {...this.props} />
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
  const { benchmark, exerciseName } = state.exerciseForm;

  return { benchmark, exerciseName };
};

export default connect(mapStateToProps, {
  exerciseUpdate, exerciseCreate
})(ExerciseCreate);
