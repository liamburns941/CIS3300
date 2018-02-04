import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { exerciseUpdate } from '../actions';
import { CardSection, Input } from './common';

class ExerciseForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          // Need to select the exercises from here
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  // const { firstName, lastName, email } = state.clientForm;

  // return { firstName, lastName, email };

  // Need to map whatever I've selected from the picker
};

export default connect(mapStateToProps, { exerciseUpdate })(ExerciseForm);
