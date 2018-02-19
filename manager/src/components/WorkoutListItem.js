import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { workoutFetch } from '../actions';

class WorkoutListItem extends Component {
  onRowPress() {
    console.log(this.props.workout);
    this.props.workoutFetch(this.props.workout);
    Actions.workoutDetail();
  }

  render() {
    const { workoutName, status } = this.props.workout;

    const {
      cardSectionStyle,
      workoutTitleStyle,
      dashTitleStyle,
      statusOutstandingTitleStyle,
      statusCompletedTitleStyle
    } = styles;

    let stylingToUse = statusOutstandingTitleStyle;

    if (status === 'Completed') {
      stylingToUse = statusCompletedTitleStyle;
    }

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={cardSectionStyle}>
            <Text style={workoutTitleStyle}>
              {workoutName}
            </Text>
            <Text style={dashTitleStyle}>
              -
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
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dashTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  },
  statusOutstandingTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#FFBF00',
    textAlign: 'center'
  },
  statusCompletedTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#00FF00',
    textAlign: 'center'
  },
  cardSectionStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingRight: 50
  }
};

export default connect(null, { workoutFetch })(WorkoutListItem);
