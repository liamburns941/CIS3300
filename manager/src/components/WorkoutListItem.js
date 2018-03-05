import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { workoutFetch } from '../actions';

class WorkoutListItem extends Component {
  onRowPress() {
    this.props.workoutFetch(this.props.workout);
    const { role } = this.props;
    if (role === 'CLIENT') {
      Actions.clientWorkoutDetail();
    } else {
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

    let stylingToUse = statusOutstandingTitleStyle;

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
  },
  cardSectionStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 50,
    paddingRight: 50
  },
  titleStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  return { role: state.role };
};

export default connect(mapStateToProps, { workoutFetch })(WorkoutListItem);
