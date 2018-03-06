import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { workoutFetch } from '../actions';

class WorkoutListItem extends Component {
  onRowPress() {
    // When a workout is selected, fetch that workout to add it to the state
    this.props.workoutFetch(this.props.workout);
    const { role } = this.props;
    // If the role is client, navigate to the client workout detail
    if (role === 'CLIENT') {
      Actions.clientWorkoutDetail();
    } else {
      // If the role is PT, navigate to the PT workout detail
      Actions.workoutDetail();
    }
  }

  render() {
    const { workoutName, status } = this.props.workout;

    const {
      workoutTitleStyle,
      statusOutstandingTitleStyle,
      statusCompletedTitleStyle
    } = styles;

    // Initially set the styling to be outstanding
    let stylingToUse = statusOutstandingTitleStyle;

    // If the status is completed, change the styling to the completed styling
    if (status === 'Completed') {
      stylingToUse = statusCompletedTitleStyle;
    }

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={workoutTitleStyle}>
              {workoutName}
            </Text>
            <Text style={stylingToUse}>
              {status}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  workoutTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  statusOutstandingTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    color: '#FFBF00',
    flex: 1,
    textAlign: 'center'
  },
  statusCompletedTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    color: '#00FF00',
    flex: 1,
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  return { role: state.role };
};

export default connect(mapStateToProps, { workoutFetch })(WorkoutListItem);
