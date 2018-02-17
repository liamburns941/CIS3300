import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { exercisesFetch, setUpdate } from '../actions';
import ExerciseListItem from './ExerciseListItem';
import { Card, CardSection, Button } from './common';

class WorkoutReview extends Component {
  componentWillMount() {
    console.log('WorkoutReview componentWillMount');
    const { singleClient, singleWorkout } = this.props;
    this.props.exercisesFetch({
      clientUid: singleClient.clientUid,
      workoutUid: singleWorkout.workoutUid
    });
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  onButtonPress() {
    const { sets } = this.props.singleWorkout;
    console.log(sets);
    console.log(this.props);

    this.props.setUpdate(sets);

    Actions.workoutWarmUp();
  }

  createDataSource({ exercises }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    return <ExerciseListItem exercise={exercise} />;
  }


  render() {
    const { workoutName, exerciseTime, restTime, sets, dateCompleted, attempts } = this.props.singleWorkout;

    const { nameStyle, workoutTitleStyle, statusTitleStyle, exerciseTitleStyle } = styles;

    console.log('line 56 workout review');
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
            <Text style={workoutTitleStyle}>
              {sets} sets
            </Text>
          </CardSection>

          <CardSection>
            <Text style={workoutTitleStyle}>
              {restTime} seconds rest
            </Text>
            <Text style={workoutTitleStyle}>
              {attempts} attempts
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
  console.log('WorkoutReview mapStateToProps');
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  return { exercises, singleWorkout: state.singleWorkout, singleClient: state.singleClient, role: state.role, sets: state.sets };
};

export default connect(mapStateToProps, { exercisesFetch, setUpdate })(WorkoutReview);
