import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { CardSection } from './common';

class DuringWorkoutExerciseListItem extends Component {
  componentWillMount() {
    console.log('this.props');
    console.log(this.props);
  }

  render() {
    const { exerciseName, benchmark, rating } = this.props.exercise;

    const { titleStyle } = styles;

    let ratingDisplay = null;

    if (rating !== '') {
      ratingDisplay = (
        <Text style={titleStyle}>
        {rating}
      </Text>
    );
    }

    return (
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {exerciseName}
            </Text>
            <Text style={titleStyle}>
              {benchmark} per set
            </Text>
            {ratingDisplay}
          </CardSection>
        </View>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    textAlign: 'center'
  }
};

const mapStateToProps = state => {
  return {
    singleWorkout: state.singleWorkout,
    singleExercise: state.singleExercise,
    singleClient: state.singleClient,
    role: state.role,
    sets: state.sets,
    benchmark: state.benchmark
  };
};

export default connect(mapStateToProps, {})(DuringWorkoutExerciseListItem);
