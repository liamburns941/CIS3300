import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { workoutsFetch, workoutCreate } from '../actions';
import WorkoutListItem from './WorkoutListItem';
import { Card, CardSection, Button } from './common';

class WorkoutList extends Component {
  componentWillMount() {
    this.props.workoutsFetch({ clientUid: this.props.singleClient.clientUid });
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  onButtonPress() {
    Actions.workoutCreate({ clientUid: this.props.singleClient.clientUid });
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

  render() {
    const { firstName, lastName } = this.props.singleClient;

    const { nameStyle, workoutTitleStyle } = styles;

    const { role } = this.props;

    let button = null;

    if (role === 'PT') {
       button = <Button onPress={this.onButtonPress.bind(this)}>Create Workout</Button>;
    }

    return (
      <Card>
        <Card>
          <CardSection>
            <Text style={nameStyle}>
              {firstName} {lastName}
            </Text>
          </CardSection>

          <CardSection>
            {button}
          </CardSection>

        </Card>

        <Card>
          <CardSection>
            <Text style={workoutTitleStyle}>
            Workouts
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
    fontWeight: 'bold',
    flex: 1
  }
};

const mapStateToProps = state => {
  console.log(state.workouts);
  const workouts = _.map(state.workouts, (val, workoutUid) => {
    return { ...val, workoutUid };
  });

  return { workouts, singleClient: state.singleClient, role: state.role };
};

export default connect(mapStateToProps, { workoutsFetch, workoutCreate })(WorkoutList);
