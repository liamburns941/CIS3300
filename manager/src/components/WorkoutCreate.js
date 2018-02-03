import React, { Component } from 'react';
import { connect } from 'react-redux';
import { workoutUpdate, workoutCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import WorkoutForm from './WorkoutForm';

class WorkoutCreate extends Component {
  onButtonPress() {
    //debugger;
    const { name, client } = this.props;
    //console.log(name, client.uid);
    debugger;
    this.props.workoutCreate({ name, uid:this.props.client.uid });
  }

  render() {
    return (
      <Card>
        <WorkoutForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  const { name, client } = state.workoutForm;

  return { name, client };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutCreate
})(WorkoutCreate);
