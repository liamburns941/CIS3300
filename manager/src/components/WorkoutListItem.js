import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { workoutFetch } from '../actions';

class WorkoutListItem extends Component {
  onRowPress() {
    this.props.workoutFetch(this.props.workout);
    Actions.workoutDetail();
  }

  render() {
    const { workoutName, status } = this.props.workout;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={styles.cardSectionStyle}>
            <Text style={styles.workoutTitleStyle}>
              {workoutName}
            </Text>
            <Text style={styles.dashTitleStyle}>
              -
            </Text>
            <Text style={styles.statusTitleStyle}>
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
    //flex: 5,
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  dashTitleStyle: {
    //flex: 2,
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  },
  statusTitleStyle: {
    //flex: 3,
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#FFBF00',
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
