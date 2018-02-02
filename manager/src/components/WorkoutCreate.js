import React, { Component } from 'react';
import { connect } from 'react-redux';
import { workoutUpdate, workoutCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import WorkoutForm from './WorkoutForm';

class WorkoutCreate extends Component {
  onButtonPress() {
    const { name } = this.props;

    this.props.workoutCreate({ name });
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
  const { name } = state.workoutForm;

  return { name };
};

export default connect(mapStateToProps, {
  workoutUpdate, workoutCreate
})(WorkoutCreate);
