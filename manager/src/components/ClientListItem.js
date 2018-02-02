import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class ClientListItem extends Component {
  onRowPress() {
    // this is what it previously was, trying to change it to going to the workout

    // Actions.clientEdit({ client: this.props.client });

    Actions.workoutList({ client: this.props.client });
    debugger;

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
