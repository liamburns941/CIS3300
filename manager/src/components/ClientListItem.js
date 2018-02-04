import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { workoutUpdate, workoutsFetch } from '../actions';

class ClientListItem extends Component {
  onRowPress() {
    //debugger;
    Actions.workoutList({ client:this.props.client });
  }

  render() {
    const { name } = this.props.client;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 24,
    paddingLeft: 15,
    paddingTop: 20,
    paddingBottom: 20
  }
};

export default ClientListItem;
