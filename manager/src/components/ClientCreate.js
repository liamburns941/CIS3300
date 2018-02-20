import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clientUpdate, clientCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ClientForm from './ClientForm';

class ClientCreate extends Component {
  onButtonPress() {
    const { firstName, lastName, email } = this.props;
    
    this.props.clientCreate({ firstName, lastName, email });
  }

  render() {
    return (
      <Card>
        <ClientForm {...this.props} />
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
  const { firstName, lastName, email } = state.clientForm;

  return { firstName, lastName, email };
};

export default connect(mapStateToProps, {
  clientUpdate, clientCreate
})(ClientCreate);
