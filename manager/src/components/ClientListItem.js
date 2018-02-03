import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { workoutUpdate, workoutsFetch } from '../actions';

class ClientListItem extends Component {
  onRowPress() {
    // this is what it previously was, trying to change it to going to the workout

     //Actions.clientEdit({ client: this.props.client });
    // workoutUpdate({ props: 'client', value:this.props.client });

    debugger;
    //Actions.workoutList({ client: this.props.client });
    Actions.workoutList({ client:this.props.client });

    //const { uid } = this.props.client;

    //workoutsFetch({ clientUid: uid });

    //debugger;
    // workoutsFetch({ props: 'clientUid', clientUid:this.props.client.uid });

  //  console.log(this.props.client.uid);

    //const { client } = this.props;

    //workoutsFetch({client});


    //this.props.clientSave({ client });

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
