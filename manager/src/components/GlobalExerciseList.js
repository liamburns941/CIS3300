import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { globalExercisesFetch } from '../actions';
import GlobalExerciseListItem from './GlobalExerciseListItem';

class GlobalExerciseList extends Component {
  componentWillMount() {
    this.props.globalExercisesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ globalExercises }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(globalExercises);
  }

  renderRow(globalExercise) {
    return <GlobalExerciseListItem globalExercise={globalExercise} />;
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
  const globalExercises = _.map(state.globalExercises, (val, globalExerciseUid) => {
    return { ...val, globalExerciseUid };
  });
  return { globalExercises };
};

export default connect(mapStateToProps, { globalExercisesFetch })(GlobalExerciseList);
