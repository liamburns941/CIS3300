import React, { Component } from 'react';
import { connect } from 'react-redux';
import { workoutUpdate, workoutCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import WorkoutForm from './WorkoutForm';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

class WorkoutCreate extends Component {
  onButtonPress() {
    const { workoutName, exerciseTime, restTime, sets } = this.props;
    debugger;
    this.props.workoutCreate({ workoutName, exerciseTime, restTime, sets, clientUid:this.props.clientUid });
    Actions.exerciseCreate({ clientUid:this.props.clientUid, workoutUid:this.props.workoutUid });
  }

  render() {
    const { titleStyle } = styles;

    return (
      <Card>
        <Text style={titleStyle}>
        Step 1: Workout Details
        </Text>
        <WorkoutForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Next
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
  debugger;
  const { workoutName, exerciseTime, restTime, sets, client } = state.workoutForm;

  return { workoutName, exerciseTime, restTime, sets, client };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutCreate
})(WorkoutCreate);
