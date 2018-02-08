import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { workoutsFetch, workoutCreate } from '../actions';
import WorkoutListItem from './WorkoutListItem';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';

class WorkoutDetail extends Component {

  render() {
    console.log(this.props);
    const { workoutName, exerciseTime, restTime, sets, attempts, dateCreated, dateCompleted, status } = this.props.workout;

    const { nameStyle, workoutTitleStyle, statusTitleStyle } = styles;

    return (
      <Card>
        <CardSection>
          <Text style={nameStyle}>
            {workoutName}
          </Text>
        </CardSection>

        <CardSection>
        <Text style={workoutTitleStyle}>
          {exerciseTime} seconds work
        </Text>
        <Text style={statusTitleStyle}>
          {status}
        </Text>
        </CardSection>

        <CardSection>
        <Text style={workoutTitleStyle}>
          {restTime} seconds rest
        </Text>
        <Text style={workoutTitleStyle}>
          {sets} sets
        </Text>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  nameStyle: {
    fontSize: 36,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  },
  workoutTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    flex: 1
  },
  statusTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    flex: 1,
    color: '#FFBF00'
  },
  cardSectionStyle: {
    flex: 1,
    flexDirection: 'row'
  }
};

export default connect(null, { workoutsFetch, workoutCreate })(WorkoutDetail);
