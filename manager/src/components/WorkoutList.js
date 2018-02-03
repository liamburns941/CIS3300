import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { workoutsFetch } from '../actions';
import WorkoutListItem from './WorkoutListItem';

class WorkoutList extends Component {
  componentWillMount() {
    debugger;
      console.log(this.props.client);
    //_.each(this.props.client, (name, value) => {
      //console.log(client);
    //  this.props.workoutsFetch({uid:client.uid});
  //  });

    this.props.workoutsFetch({ uid:this.props.client.uid });
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
      //debugger;

    this.dataSource = ds.cloneWithRows(workouts);
  }

  renderRow(workout) {
    return <WorkoutListItem workout={workout} />;
  }

  render() {
    //console.log(this.props.client.name);
    console.log('The workouts for ' + this.props.client.name + ' will go here');
    return (
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
    );
  }
}

const mapStateToProps = state => {

  const workouts = _.map(state.workouts, (val, uid) => {
    return { ...val, uid };
  });

  return { workouts };
};

export default connect(mapStateToProps, { workoutsFetch })(WorkoutList);
