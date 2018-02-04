import React, { Component } from 'react';
import { connect } from 'react-redux';
import { workoutUpdate, workoutCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import WorkoutForm from './WorkoutForm';

class WorkoutCreate extends Component {

  onButtonPress() {
    debugger;
    const { name, exerciseTime, restTime, sets } = this.props;
    this.props.workoutCreate({ name, exerciseTime, restTime, sets, uid:this.props.uid });
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
  const { name, exerciseTime, restTime, sets, client } = state.workoutForm;

  return { name, exerciseTime, restTime, sets, client };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutCreate
})(WorkoutCreate);
