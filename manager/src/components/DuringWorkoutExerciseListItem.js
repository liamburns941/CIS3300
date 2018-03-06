import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class DuringWorkoutExerciseListItem extends Component {
  render() {
    const { exerciseName, benchmark } = this.props.exercise;

    const { titleStyle } = styles;
    // List item to display the exercise name and benchmark during the workout
    return (
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {exerciseName}
            </Text>
            <Text style={titleStyle}>
              {benchmark} per set
            </Text>
          </CardSection>
        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    textAlign: 'center'
  }
};

export default DuringWorkoutExerciseListItem;
