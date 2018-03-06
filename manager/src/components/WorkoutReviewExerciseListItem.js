import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import { exerciseSave, exerciseFetch } from '../actions';
import { CardSection } from './common';

class WorkoutReviewExerciseListItem extends Component {
  // Set thisRating as blank initially
  state = { thisRating: '' };
  componentWillMount() {
    // Get the current exercise
    this.props.exerciseFetch(this.props.exercise);
  }

  onRatingChange(text) {
    const { clientUid } = this.props.singleClient;
    const { workoutUid } = this.props.singleWorkout;
    const { exerciseUid } = this.props.exercise;

    const rating = text;
    // On rating change, save the rating in firebase
    this.props.exerciseSave({ clientUid, workoutUid, exerciseUid, rating });
  }

  updateThisRating(thisRating) {
    // When the value is changed in the picker, it is passed into here and added to the state
    this.setState({ thisRating });
    this.onRatingChange(thisRating);
  }

  render() {
    const { exerciseName, benchmark } = this.props.exercise;

    const { titleStyle, pickerStyle } = styles;

    return (
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {exerciseName}
            </Text>
            <Text style={titleStyle}>
              {benchmark} per set
            </Text>
            <Picker
              style={pickerStyle}
              selectedValue={this.state.thisRating}
              onValueChange={(thisRating) => this.updateThisRating(thisRating)}
            >
              <Picker.Item label="Select a rating" value="" />
              <Picker.Item label="Easy" value="Easy" />
              <Picker.Item label="Okay" value="Okay" />
              <Picker.Item label="Difficult" value="Difficult" />
            </Picker>
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
  },
  pickerStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1
  }
};

const mapStateToProps = state => {
  return {
    singleWorkout: state.singleWorkout,
    singleClient: state.singleClient,
    rating: state.rating
  };
};

export default connect(mapStateToProps, {
  exerciseSave,
  exerciseFetch
})(WorkoutReviewExerciseListItem);
