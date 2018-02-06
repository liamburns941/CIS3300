import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { exercisesFetch } from '../actions';
import ExerciseListItem from './ExerciseListItem';

class ExerciseList extends Component {
  componentWillMount() {
    this.props.exercisesFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ exercises }) {
    //debugger;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(exercises);
  }

  renderRow(exercise) {
    return <ExerciseListItem exercise={exercise} />;
  }

  render() {
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
  const exercises = _.map(state.exercises, (val, exerciseUid) => {
    return { ...val, exerciseUid };
  });

  return { exercises };
};

export default connect(mapStateToProps, { exercisesFetch })(ExerciseList);
