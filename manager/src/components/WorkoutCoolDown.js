import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import CountdownCircle from 'react-native-countdown-circle';
import { exercisesFetch, workoutSaveForReview, attemptsUpdate } from '../actions';
import ExerciseListItem from './ExerciseListItem';
import { Card, CardSection } from './common';

class WorkoutCoolDown extends Component {
  componentWillMount() {
    const { singleClient, singleWorkout, attempts } = this.props;
    this.props.exercisesFetch({
      clientUid: singleClient.clientUid,
      workoutUid: singleWorkout.workoutUid
    });

    const newAttempts = parseInt(attempts, 10) + 1;
    this.props.attemptsUpdate(newAttempts);
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
    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    return <ExerciseListItem exercise={exercise} />;
  }

  render() {
    const { nameStyle, workoutTitleStyle } = styles;
    const { workoutName, workoutUid } = this.props.singleWorkout;
    const { clientUid } = this.props.singleClient;
    const { sets, attempts } = this.props;

    return (
      <Card>
        <Card>
          <CardSection>
            <Text style={nameStyle}>
              {workoutName}
            </Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection style={{ alignItems: 'center', justifyContent: 'center' }}>
            <CountdownCircle
              seconds={5}
              radius={170}
              borderWidth={20}
              color="#FFBF00"
              bgColor="#fff"
              textStyle={{ fontSize: 50 }}
              onTimeElapsed={() => this.props.workoutSaveForReview({
                clientUid,
                workoutUid,
                attempts
              })}
            />
          </CardSection>
          <CardSection>
            <Text style={workoutTitleStyle}>
              Cool Down
            </Text>
          </CardSection>
        </Card>

        <Card>
          <CardSection>
            <Text style={workoutTitleStyle}>
              Sets left: {sets}
            </Text>
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
  }
};

const mapStateToProps = state => {
  const exercises = _.map(state.exercises, (val, workoutUid, clientUid) => {
    return { ...val, workoutUid, clientUid };
  });

  return {
    exercises,
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    sets: state.sets,
    attempts: state.attempts };
};

export default connect(mapStateToProps, {
  exercisesFetch,
  workoutSaveForReview,
  attemptsUpdate
})(WorkoutCoolDown);
