import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { workoutsFetch, workoutCreate } from '../actions';
import WorkoutListItem from './WorkoutListItem';
import { Card, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';

class WorkoutList extends Component {
  componentWillMount() {
    this.props.workoutsFetch({ clientUid:this.props.client.clientUid });
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ workouts }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(workouts);
  }

  renderRow(workout) {
    return <WorkoutListItem workout={workout} />;
  }

  onButtonPress() {
    //debugger;
    Actions.workoutCreate({ clientUid:this.props.client.clientUid });
  }

  render() {
    const { firstName, lastName } = this.props.client;

    const { nameStyle, workoutTitleStyle } = styles;

    return (
      <Card>
        <Text style={nameStyle}>
          {firstName} {lastName}
        </Text>
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Add Workout
          </Button>
        </CardSection>
        <Text style={workoutTitleStyle}>
        Workouts
        </Text>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </Card>
    );
  }
}

const styles = {
  nameStyle: {
    fontSize: 36,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  },
  workoutTitleStyle: {
    fontSize: 24,
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  }
};

const mapStateToProps = state => {

  const workouts = _.map(state.workouts, (val, clientUid) => {
    return { ...val, clientUid };
  });

  return { workouts };
};

export default connect(mapStateToProps, { workoutsFetch, workoutCreate })(WorkoutList);
