import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { exercisesFetch } from '../actions';
import ExerciseListItem from './ExerciseListItem';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';

class WorkoutDetail extends Component {

  componentWillMount() {
    this.props.exercisesFetch({ clientUid:this.props.singleClient.clientUid, workoutUid:this.props.singleWorkout.workoutUid });
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ exercises }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    console.log(this.dataSource);
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    return <ExerciseListItem exercise={exercise} />;
  }


  render() {
    const { workoutName, exerciseTime, restTime, sets, attempts, dateCreated, dateCompleted, status } = this.props.singleWorkout;

    const { nameStyle, workoutTitleStyle, statusTitleStyle, exerciseTitleStyle, listViewStyle } = styles;

    return (
      <Card>
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

        <Card>
          <CardSection>
            <Text style={exerciseTitleStyle}>
            Exercises
            </Text>
          </CardSection>

          <CardSection>
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
          </CardSection>
        </Card>

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
  exerciseTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  }
};

const mapStateToProps = state => {
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  return { exercises, singleWorkout: state.singleWorkout, singleClient: state.singleClient };
};

export default connect(mapStateToProps, { exercisesFetch })(WorkoutDetail);
