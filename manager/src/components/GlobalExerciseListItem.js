import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { clientFetch } from '../actions';

class GlobalExerciseListItem extends Component {
  onRowPress() {
    console.log(this.props.globalExercise.exerciseName);
    console.log('global exercises');
    //this.props.clientFetch(this.props.client);
    //Actions.workoutList();
  }

  render() {
    console.log(this.props.globalExercise);
    
    const { exerciseName } = this.props.globalExercise;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {exerciseName}
            </Text>
          </CardSection>
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

export default connect(null, { clientFetch })(GlobalExerciseListItem);
