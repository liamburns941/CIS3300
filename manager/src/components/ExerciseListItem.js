import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ExerciseListItem extends Component {

  render() {
    const { exerciseName, benchmark } = this.props.exercise;

    return (
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {exerciseName}
            </Text>
            <Text style={styles.benchmarkStyle}>
              {benchmark}
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
    paddingBottom: 20
  },
  benchmarkStyle: {
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20
  }
};

export default ExerciseListItem;
