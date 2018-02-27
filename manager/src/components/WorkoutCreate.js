import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { workoutUpdate, workoutCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import WorkoutForm from './WorkoutForm';

class WorkoutCreate extends Component {
  onButtonPress() {
    const { workoutName, exerciseTime, restTime, sets, clientUid } = this.props;
    this.props.workoutCreate({ workoutName, exerciseTime, restTime, sets, clientUid });
  }

  render() {
    const { titleStyle } = styles;

    return (
      <Card>
        <Text style={titleStyle}>
        Enter your workout details and on the next screen you can add exercises
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
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  }
};

const mapStateToProps = (state) => {
  const { workoutName, exerciseTime, restTime, sets } = state.workoutForm;

  return { workoutName, exerciseTime, restTime, sets };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutCreate
})(WorkoutCreate);
