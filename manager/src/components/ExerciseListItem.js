import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class ExerciseListItem extends Component {
  render() {
    const { exerciseName, benchmark, rating } = this.props.exercise;

    const { titleStyle, easyStyle, okayStyle, difficultStyle } = styles;

    let ratingDisplay = null;
    let stylingToUse = null;

    if (rating === 'Easy') {
      stylingToUse = easyStyle;
    } else if (rating === 'Okay') {
      stylingToUse = okayStyle;
    } else {
      stylingToUse = difficultStyle;
    }

    if (rating !== '') {
      ratingDisplay = (
        <Text style={stylingToUse}>
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
  },
  easyStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    color: '#00FF00',
    textAlign: 'center'
  },
  okayStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    color: '#FFBF00',
    textAlign: 'center'
  },
  difficultStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    color: '#FF0000',
    textAlign: 'center'
  }
};

export default ExerciseListItem;
